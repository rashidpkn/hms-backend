import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponse } from 'helpers/common.helpers';
import { User } from 'src/database/schema/users.schema';
import { UserRoles, UserStatus } from 'src/database/schema/columns.helpers';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<CommonResponse<{}>> {
    const user = await this.users.findOne({ email: body.email }).exec();
    if (!user) throw new BadRequestException('User not found');
    if (user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException('User not active');
    }
    if (user.isDeleted) throw new BadRequestException('User not found');
    if (!Object.values(UserRoles).includes(user.role)) {
      throw new UnauthorizedException('Unsupported user role');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      companyId: user.companyId,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: configuration().jwt.accessTokenSecret,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { secret: configuration().jwt.refreshTokenSecret, expiresIn: '7d' },
    );
    await this.users
      .updateOne(
        { id: user.id },
        { $set: { lastLogin: new Date(), refreshToken } },
      )
      .exec();

    return {
      data: { user: payload, accessToken, refreshToken },
      message: 'Login successful',
    };
  }

  async refreshToken(body: RefreshTokenDto) {
    try {
      const verify: { id: number } = await this.jwtService.verifyAsync(
        body.refreshToken,
        { secret: configuration().jwt.refreshTokenSecret },
      );
      const user = await this.users
        .findOne({ id: verify.id, refreshToken: body.refreshToken })
        .exec();
      if (
        !user ||
        user.isDeleted ||
        user.status !== UserStatus.ACTIVE ||
        !Object.values(UserRoles).includes(user.role)
      ) {
        throw new UnauthorizedException('Invalid token');
      }

      const payload = {
        id: user.id,
        role: user.role,
        email: user.email,
        companyId: user.companyId,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: configuration().jwt.accessTokenSecret,
        expiresIn: '15m',
      });
      const refreshToken = await this.jwtService.signAsync(
        { id: user.id },
        { secret: configuration().jwt.refreshTokenSecret, expiresIn: '7d' },
      );
      await this.users
        .updateOne({ id: user.id }, { $set: { refreshToken } })
        .exec();
      return {
        data: { user: payload, accessToken, refreshToken },
        message: 'Refresh token successful',
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(id: number) {
    await this.users.updateOne({ id }, { $set: { refreshToken: null } }).exec();
    return { data: null, message: 'Logout Successfully' };
  }
}
