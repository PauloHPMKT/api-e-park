import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { EmployeesModule } from '../employees/employees.module';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { LocalStrategy } from './application/guards/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    DatabaseModule,
    EmployeesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EnvConfigService, LocalStrategy],
  exports: [],
})
export class AuthModule {}
