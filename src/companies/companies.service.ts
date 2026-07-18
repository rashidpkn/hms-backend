import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
import { UpdateCompanyDto } from './dto/UpdateCompany.dto';
import { InjectDb } from 'src/database/database.provider';
import type { DB } from 'src/database/client';
import { companiesTable } from 'src/database/schema/company.schema';
import { CommonResponse } from 'helpers/common.helpers';

@Injectable()
export class CompaniesService {
    constructor(@InjectDb() private readonly db: DB) { }

    async create(createCompanyDto: CreateCompanyDto): Promise<CommonResponse<unknown>> {
        const data = await this.db.insert(companiesTable).values(createCompanyDto);
        return {
            data,
            message: "Company created successfully",
        };
    }

    findAll() {
        return `This action returns all companies`;
    }

    findOne(id: number) {
        return `This action returns a #${id} company`;
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return `This action updates a #${id} company`;
    }

    remove(id: number) {
        return `This action removes a #${id} company`;
    }
}
