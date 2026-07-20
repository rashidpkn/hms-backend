import { CreateCompanyDto } from './CreateCompany.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
