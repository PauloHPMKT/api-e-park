import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { EmployeesModule } from '../employees/employees.module';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { LocalStrategy } from './application/guards/strategies/local.strategy';
import { JwtStrategy } from './application/guards/strategies/jwt.strategy';
import { jwtRegisterProvider } from './infra/providers/jwt-register.provider';
import { LoginValiationMiddleware } from './application/middlewares/login-validation-middleware';

@Module({
  imports: [
    EnvConfigModule.forRoot(),
    DatabaseModule,
    EmployeesModule,
    JwtModule.registerAsync(jwtRegisterProvider),
  ],
  controllers: [AuthController],
  providers: [AuthService, EnvConfigService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValiationMiddleware).forRoutes('auth/login');
  }
}
