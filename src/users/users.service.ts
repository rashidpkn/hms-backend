import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SequencesService } from 'src/database/database.module';
import { Profile } from 'src/database/schema/profiles.schema';
import { User } from 'src/database/schema/users.schema';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<User>,
    @InjectModel(Profile.name) private readonly profiles: Model<Profile>,
    private readonly sequences: SequencesService,
  ) {}

  async registerUser(body: RegisterUserDto) {
    if (await this.users.exists({ email: body.email })) {
      throw new BadRequestException('User with this email already exists');
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

  async getAllUsers() {
    const data = await this.users.find({ isDeleted: false }).exec();
    return { message: 'Users fetched successfully', data };
  }

  async getUserById(id: number) {
    const data = await this.users
      .findOne({ id, isDeleted: false })
      .populate('profile')
      .exec();
    if (!data) throw new BadRequestException('User not found');
    return { message: 'User fetched successfully', data };
  }
}
