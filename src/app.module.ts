import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai/openai.module';
import { CompanyModule } from './modules/companies/company.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';
import { EnvConfigService } from './infra/env-config/env-config.service';
@Module({
  imports: [EnvConfigModule.forRoot(), CompanyModule, OpenaiModule],
  providers: [EnvConfigService],
  controllers: [],
})
export class AppModule {}
