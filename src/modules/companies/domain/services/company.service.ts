import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CompanyEntity } from '../entities/Company';
import { CreateCompanyDto } from '../../application/dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_MODEL')
    private readonly companyModel: Model<CompanyEntity>,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyModel.find().exec();
  }

  async create(data: CreateCompanyDto): Promise<CompanyEntity> {
    return await this.companyModel.create(data);
  }
}
