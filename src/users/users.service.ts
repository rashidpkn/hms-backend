import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SequencesService } from 'src/database/database.module';
import { Company } from 'src/database/schema/company.schema';
import { Profile } from 'src/database/schema/profiles.schema';
import { User } from 'src/database/schema/users.schema';
import { UserRoles } from 'src/database/schema/columns.helpers';
import { RegisterUserDto } from './dto/register.dto';
import { AuthUser } from './auth/getUser.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<User>,
    @InjectModel(Company.name) private readonly companies: Model<Company>,
    @InjectModel(Profile.name) private readonly profiles: Model<Profile>,
    private readonly sequences: SequencesService,
  ) {}

  async registerUser(body: RegisterUserDto) {
    if (await this.users.exists({ email: body.email })) {
      throw new BadRequestException('User with this email already exists');
    }
    if (!(await this.companies.exists({ id: body.companyId }))) {
      throw new BadRequestException('Invalid company ID');
    }

    body.password = await bcrypt.hash(body.password, 10);
    const user = await this.users.create({
      ...body,
      id: await this.sequences.next('users'),
    });
    const profile = await this.profiles.create({
      id: await this.sequences.next('profiles'),
      userId: user.id,
      address: body.address,
      phoneNumber: body.phoneNumber,
      salary: body.salary,
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    });

    return {
      message: 'User registered successfully',
      data: { ...user.toObject(), ...profile.toObject() },
    };
  }

  async getAllUsers(user: AuthUser) {
    const filter =
      user.role === UserRoles.MANAGER
        ? { companyId: user.companyId, isDeleted: false }
        : { isDeleted: false };
    const data = await this.users.find(filter).populate('company').exec();
    return { message: 'Users fetched successfully', data };
  }

  async getUserById(id: number) {
    const data = await this.users
      .findOne({ id, isDeleted: false })
      .populate(['company', 'profile'])
      .exec();
    if (!data) throw new BadRequestException('User not found');
    return { message: 'User fetched successfully', data };
  }
}
