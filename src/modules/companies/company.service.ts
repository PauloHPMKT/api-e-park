import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CompanyEntity } from './domain/entities/Company';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('COMPANY_MODEL')
    private readonly companyModel: Model<CompanyEntity>,
  ) {}
  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyModel.find().exec();
  }
}
