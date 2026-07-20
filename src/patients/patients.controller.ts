import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { RegisterPatientDto } from './dto/register.dto';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { type AuthUser, GetUser } from 'src/users/auth/getUser.decorator';

@UseGuards(AuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  //register patient

  @Post()
  async create(@Body() createPatientDto: RegisterPatientDto, @GetUser() user: AuthUser) {
    createPatientDto.createdBy = user.id;
    createPatientDto.companyId = user.companyId;
    return await this.patientsService.create(createPatientDto);
  }

  // get all patients
  @Get()
  async getAll() {
    // return this.patientsService.findAll();
  }

  // get a patient by id
  @Get(':id')
  async getSingle() {
    // return this.patientsService.findOne();
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
