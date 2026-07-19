import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
import { UpdateCompanyDto } from './dto/UpdateCompany.dto';
import { InjectDb } from 'src/database/database.provider';
import type { DB } from 'src/database/client';
import { companiesTable } from 'src/database/schema/company.schema';
import { CommonResponse } from 'helpers/common.helpers';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class CompaniesService {
    constructor(@InjectDb() private readonly db: DB) { }

    async create(createCompanyDto: CreateCompanyDto): Promise<CommonResponse<unknown>> {
        const isExist = await this.db.query.companiesTable.findFirst({
            where: or(
                eq(companiesTable.name, createCompanyDto.name),
                eq(companiesTable.email, createCompanyDto.email),
                eq(companiesTable.phoneNumber, createCompanyDto.phoneNumber),
                eq(companiesTable.email2, createCompanyDto.email),
                eq(companiesTable.phoneNumber2, createCompanyDto.phoneNumber),
                eq(companiesTable.licenseNumber, createCompanyDto.licenseNumber)
            )
        })

        if (isExist) {
            const conflicts: string[] = [];
            if (isExist.name === createCompanyDto.name) {
                conflicts.push('name');
            }
            if (isExist.email === createCompanyDto.email || isExist.email2 === createCompanyDto.email) {
                conflicts.push('email');
            }
            if (isExist.phoneNumber === createCompanyDto.phoneNumber || isExist.phoneNumber2 === createCompanyDto.phoneNumber) {
                conflicts.push('phone number');
            }
            if (isExist.licenseNumber && isExist.licenseNumber === createCompanyDto.licenseNumber) {
                conflicts.push('license number');
            }

            throw new BadRequestException(
                `Company already exists with the same ${conflicts.join(', ')}`,
            );
        }
        const data = await this.db.insert(companiesTable).values(createCompanyDto).returning();
        return {
            data: data[0],
            message: "Company created successfully",
        };
    }

    async findAll(): Promise<CommonResponse<{}[]>> {
        const data = await this.db.query.companiesTable.findMany({ where: eq(companiesTable.isDeleted, false) });
        return {
            data,
            message: "Companies fetched successfully",
        }
    }

    async findOne(id: number) {
        const data = await this.db.query.companiesTable.findFirst({
            where: eq(companiesTable.id, id)
        });
        if (!data) {
            throw new BadRequestException("Company not found");
        }
        if (data.isDeleted) {
            throw new BadRequestException("Company is already deleted");
        }
        return {
            data,
            message: "Company fetched successfully",
        };
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto) {
        const isExist = await this.db.query.companiesTable.findFirst({
            where: eq(companiesTable.id, id)
        });
        if (!isExist) {
            throw new BadRequestException("Company not found");
        }
        if (isExist.isDeleted) {
            throw new BadRequestException("Company is already deleted");
        }
        const data = await this.db.update(companiesTable).set(updateCompanyDto).where(eq(companiesTable.id, id)).returning();
        return {
            data: data[0],
            message: "Company updated successfully",
        };
    }

    async remove(id: number) {
        const isExist = await this.db.query.companiesTable.findFirst({
            where: eq(companiesTable.id, id)
        });
        if (!isExist) {
            throw new BadRequestException("Company not found");
        }
        if (isExist.isDeleted) {
            throw new BadRequestException("Company is already deleted");
        }
        const data = await this.db.update(companiesTable).set({ isDeleted: true, deletedAt: new Date() }).where(eq(companiesTable.id, id)).returning();
        return {
            data: data[0],
            message: "Company deleted successfully",
        };
    }
}
