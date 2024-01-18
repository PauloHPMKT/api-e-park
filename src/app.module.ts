import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai/openai.module';
import { CompanyModule } from './modules/companies/company.module';
import { EnvConfigModule } from './infra/env-config/env-config.module';
import { EnvConfigService } from './infra/env-config/env-config.service';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/auth/auth.module';
import { publicProvider } from './modules/auth/infra/providers/public.provider';
@Module({
  imports: [
    EnvConfigModule.forRoot(),
    AuthModule,
    EmployeesModule,
    CompanyModule,
    OpenaiModule,
  ],
  providers: [EnvConfigService, ...publicProvider],
  controllers: [],
})
export class AppModule {}
