import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //register user
  @Post()
  registerUser(@Body() body: RegisterUserDto) {
    return this.usersService.registerUser(body);
  }

  //get all users
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //get user by id
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  //update user by id
  @Post(':id')
  updateUserById() {
    // return this.usersService.updateUserById();
  }

  //delete user by id
  @Post(':id')
  deleteUserById() {
    // return this.usersService.deleteUserById();
  }
}
