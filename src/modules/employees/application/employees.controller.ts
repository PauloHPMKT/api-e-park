import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeesService } from '../domain/services/employees.service';
import { CreateEmployeeDto } from './dto/CreateEmployees.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees(): Promise<CreateEmployeeDto[]> {
    return await this.employeesService.getAll();
  }

  @Post()
  async createEmployee(
    @Body() data: CreateEmployeeDto,
  ): Promise<CreateEmployeeDto> {
    return await this.employeesService.create(data);
  }

  @Get('find-by-email')
  async findEmployeeByEmail(
    @Query('email') email: string,
  ): Promise<CreateEmployeeDto> {
    return await this.employeesService.findByEmail(email);
  }
}
