import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonResponse } from 'helpers/common.helpers';
import { SequencesService } from 'src/database/database.module';
import { Company } from 'src/database/schema/company.schema';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
import { UpdateCompanyDto } from './dto/UpdateCompany.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private readonly companies: Model<Company>,
    private readonly sequences: SequencesService,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CommonResponse<unknown>> {
    const conditions: Record<string, string>[] = [
      { name: createCompanyDto.name },
      { email: createCompanyDto.email },
      { phoneNumber: createCompanyDto.phoneNumber },
    ];
    if (createCompanyDto.email)
      conditions.push({ email2: createCompanyDto.email });
    if (createCompanyDto.phoneNumber) {
      conditions.push({ phoneNumber2: createCompanyDto.phoneNumber });
    }
    if (createCompanyDto.licenseNumber) {
      conditions.push({ licenseNumber: createCompanyDto.licenseNumber });
    }

    const existing = await this.companies.findOne({ $or: conditions }).exec();
    if (existing) {
      const conflicts: string[] = [];
      if (existing.name === createCompanyDto.name) conflicts.push('name');
      if (
        existing.email === createCompanyDto.email ||
        existing.email2 === createCompanyDto.email
      ) {
        conflicts.push('email');
      }
      if (
        existing.phoneNumber === createCompanyDto.phoneNumber ||
        existing.phoneNumber2 === createCompanyDto.phoneNumber
      ) {
        conflicts.push('phone number');
      }
      if (
        existing.licenseNumber &&
        existing.licenseNumber === createCompanyDto.licenseNumber
      ) {
        conflicts.push('license number');
      }
      throw new BadRequestException(
        `Company already exists with the same ${conflicts.join(', ')}`,
      );
    }

    const data = await this.companies.create({
      ...createCompanyDto,
      id: await this.sequences.next('companies'),
    });
    return { data, message: 'Company created successfully' };
  }

  async findAll(): Promise<CommonResponse<Company[]>> {
    const data = await this.companies.find({ isDeleted: false }).exec();
    return { data, message: 'Companies fetched successfully' };
  }

  async findOne(id: number) {
    const data = await this.companies.findOne({ id }).exec();
    if (!data) throw new BadRequestException('Company not found');
    if (data.isDeleted)
      throw new BadRequestException('Company is already deleted');
    return { data, message: 'Company fetched successfully' };
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const existing = await this.companies.findOne({ id }).exec();
    if (!existing) throw new BadRequestException('Company not found');
    if (existing.isDeleted)
      throw new BadRequestException('Company is already deleted');

    const data = await this.companies
      .findOneAndUpdate(
        { id },
        { $set: updateCompanyDto },
        { new: true, runValidators: true },
      )
      .exec();
    return { data, message: 'Company updated successfully' };
  }

  async remove(id: number) {
    const existing = await this.companies.findOne({ id }).exec();
    if (!existing) throw new BadRequestException('Company not found');
    if (existing.isDeleted)
      throw new BadRequestException('Company is already deleted');

    const data = await this.companies
      .findOneAndUpdate(
        { id },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true },
      )
      .exec();
    return { data, message: 'Company deleted successfully' };
  }
}
