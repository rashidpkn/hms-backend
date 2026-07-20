import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './users/auth/auth.guard';
import { RolesGuard } from './users/auth/roles.guard';
import { UserRoles } from './database/schema/columns.helpers';
import { Roles } from './users/auth/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRoles.PHARMACIST)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
