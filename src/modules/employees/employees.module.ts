import { Module } from '@nestjs/common';
import { EmployeesController } from './application/employees.controller';
import { EmployeesService } from './domain/services/employees.service';
import { employeesProviders } from './infra/providers/employees.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, ...employeesProviders],
  exports: [EmployeesService],
})
export class EmployeesModule {}
