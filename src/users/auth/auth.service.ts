import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDb } from 'src/database/database.provider';
import type { DB } from 'src/database/client';
import { CommonResponse } from 'helpers/common.helpers';
import { LoginDto } from './dto/login.dto';
import { usersTable } from 'src/database/schema';
import { and, eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/database/schema/columns.helpers';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: DB,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<CommonResponse<{}>> {
    const user = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException('User not active');
    }
    if (user.isDeleted) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
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

    await this.db
      .update(usersTable)
      .set({ lastLogin: new Date(), refreshToken })
      .where(eq(usersTable.id, user.id));

    return {
      data: {
        user: payload,
        accessToken,
        refreshToken,
      },
      message: 'Login successful',
    };
  }

  async refreshToken(body: RefreshTokenDto) {
    try {
      const verify: { id: number } = await this.jwtService.verifyAsync(
        body.refreshToken,
        { secret: configuration().jwt.refreshTokenSecret },
      );
      const user = await this.db.query.usersTable.findFirst({
        where: and(
          eq(usersTable.id, verify.id),
          eq(usersTable.refreshToken, body.refreshToken),
        ),
      });
      if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
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
      await this.db
        .update(usersTable)
        .set({ refreshToken })
        .where(eq(usersTable.id, user.id));
      return {
        data: {
          user: payload,
          accessToken,
          refreshToken,
        },
        message: 'Refresh token successful',
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
