import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register.dto';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { UserRoles } from 'src/database/schema/columns.helpers';
import { Roles } from './auth/roles.decorator';
import { type AuthUser, GetUser } from './auth/getUser.decorator';
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //register user
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Post()
  registerUser(@Body() body: RegisterUserDto, @GetUser() user: AuthUser) {
    body.companyId = user.companyId
    return this.usersService.registerUser(body);
  }

  //get all users
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //get user by id
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  //update user by id
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Put(':id')
  updateUserById() {
    // return this.usersService.updateUserById();
  }

  //delete user by id
  @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
  @Post(':id')
  deleteUserById() {
    // return this.usersService.deleteUserById();
  }
}
