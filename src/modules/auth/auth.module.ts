import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AuthController } from './application/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [DatabaseModule, EmployeesModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
