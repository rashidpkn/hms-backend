import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { RegisterPatientDto } from './dto/register.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { type AuthUser, GetUser } from 'src/users/auth/getUser.decorator';

import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  //register patient

  @Post()
  async create(
    @Body() createPatientDto: RegisterPatientDto,
    @GetUser() user: AuthUser,
  ) {
    createPatientDto.createdBy = user.id;
    return await this.patientsService.create(createPatientDto);
  }

  @Get()
  getAll() {
    return this.patientsService.getAllPatients();
  }

  @Get('doctor/:id')
  async getPatientsByDoctor(@Param('id', ParseIntPipe) doctorId: number) {
    return this.patientsService.getPatientsByDoctor(doctorId);
  }

  // get a patient by id
  @Get(':id')
  async getSingle(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.getSingle(id);
  }

  // update a patient
  @Put(':id')
  async update() {
    // return this.patientsService.update();
  }

  // delete a patient
  @Delete(':id')
  async delete() {
    // return this.patientsService.remove();
  }
}
