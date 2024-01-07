import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai/openai.module';
import { CompanyModule } from './modules/companies/company.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';
import { EnvConfigService } from './infra/env-config/env-config.service';
import { DatabaseModule } from './infra/database/database.module';
@Module({
  imports: [
    EnvConfigModule.forRoot(),
    DatabaseModule,
    CompanyModule,
    OpenaiModule,
  ],
  providers: [EnvConfigService],
  controllers: [],
})
export class AppModule {}
