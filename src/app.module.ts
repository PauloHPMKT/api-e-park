import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai/openai.module';
import { CompanyModule } from './modules/companies/company.module';
@Module({
  imports: [CompanyModule, OpenaiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
