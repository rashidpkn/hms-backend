import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
import { UpdateCompanyDto } from './dto/UpdateCompany.dto';
import { CommonResponse } from 'helpers/common.helpers';


@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  //create
  async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CommonResponse<unknown>> {
    return await this.companiesService.create(createCompanyDto);
  }

  @Get()
  //get all companies
  async getAllCompanies() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  //get single company
  async getSingleCompany(@Param('id') id: number) {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  //update company
  async updateCompany(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  //delete company
  async deleteCompany(@Param('id') id: number) {
    return this.companiesService.remove(id);
  }
}
