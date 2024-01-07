import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from '../domain/services/company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Get()
  async getCompanies() {
    return await this.companyService.findAll();
  }

  @Post()
  async createCompany(@Body() data: CreateCompanyDto) {
    return this.companyService.create(data);
  }
}
