import { BadRequestException, Injectable } from '@nestjs/common';
import type { DB } from 'src/database/client';
import { InjectDb } from 'src/database/database.provider';
import { RegisterUserDto } from './dto/register.dto';
import { companiesTable, profilesTable, usersTable } from 'src/database/schema';
import { and, eq, or, SQL } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { AuthUser } from './auth/getUser.decorator';
import { UserRoles } from 'src/database/schema/columns.helpers';

@Injectable()
export class UsersService {
  constructor(@InjectDb() private readonly db: DB) { }

  async registerUser(body: RegisterUserDto) {
    const existingUser = await this.db.query.usersTable.findFirst({
      where: eq(usersTable.email, body.email),
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const validatedTenant = await this.db.query.companiesTable.findFirst({
      where: eq(companiesTable.id, body.companyId),
    });
    if (!validatedTenant) {
      throw new BadRequestException('Invalid company ID');
    }

    body.password = await bcrypt.hash(body.password, 10);

    const data = await this.db
      .insert(usersTable)
      .values(body)
      .returning()
      .execute();

    const data2 = await this.db
      .insert(profilesTable)
      .values({
        userId: data[0].id,
        address: body.address,
        phoneNumber: body.phoneNumber,
        salary: body.salary,
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      })
      .returning()
      .execute();
    return {
      message: 'User registered successfully',
      data: { ...data[0], ...data2[0] },
    };
  }

  async getAllUsers(user: AuthUser) {
    let where: SQL<unknown> | undefined
    if (user.role === UserRoles.MANAGER) {
      where = and(eq(usersTable.companyId, user.companyId), eq(usersTable.isDeleted, false))
    } else {
      where = eq(usersTable.isDeleted, false)
    }
    const data = await this.db.query.usersTable.findMany({
      where,
      with: { company: true }
    });
    return {
      message: 'Users fetched successfully',
      data: data,
    };
  }

  async getUserById(id: number) {
    const data = await this.db.query.usersTable.findFirst({
      where: and(eq(usersTable.id, id), eq(usersTable.isDeleted, false)),
      with: {
        company: true,
        profile: true,
      },
    });

    if (!data) {
      throw new BadRequestException('User not found');
    }
    return {
      message: 'User fetched successfully',
      data: data,
    };
  }
}
