import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { EmployeesModule } from '../employees/employees.module';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { LocalStrategy } from './application/guards/strategies/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './application/guards/strategies/jwt.strategy';
import { jwtRegisterProvider } from './infra/providers/jwt-register.provider';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    DatabaseModule,
    EmployeesModule,
    JwtModule.register(jwtRegisterProvider as JwtModuleOptions),
  ],
  controllers: [AuthController],
  providers: [AuthService, EnvConfigService, JwtStrategy, LocalStrategy],
  exports: [],
})
export class AuthModule {}
