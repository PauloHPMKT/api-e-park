import { Module } from '@nestjs/common';
import { CompanyController } from './application/company.controller';
import { CompanyService } from './domain/services/company.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { companyProviders } from './infra/providers/company.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
})
export class CompanyModule {}
