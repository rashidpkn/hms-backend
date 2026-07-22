import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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

@UseGuards(AuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  //register patient

  @Post()
  async create(
    @Body() createPatientDto: RegisterPatientDto,
    @GetUser() user: AuthUser,
  ) {
    createPatientDto.createdBy = user.id;
    createPatientDto.companyId = user.companyId;
    return await this.patientsService.create(createPatientDto);
  }


  @Get("company/:id")
  async getPatientsByCompany(@Param("id", ParseIntPipe) companyId: number, @GetUser() user: AuthUser) {
    if (companyId != user.companyId) {
      throw new ForbiddenException("You are not authorized to access this company's patients");
    }
    return this.patientsService.getPatientsByCompany(companyId);
  }

  @Get("doctor/:id")
  async getPatientsByDoctor(@Param("id", ParseIntPipe) doctorId: number, @GetUser() user: AuthUser) {
    return this.patientsService.getPatientsByDoctor(doctorId, user.companyId);
  }

  // get a patient by id
  @Get(':id')
  async getSingle(@Param("id", ParseIntPipe) id: number, @GetUser() user: AuthUser) {
    return this.patientsService.getSingle(id, user.companyId);
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
