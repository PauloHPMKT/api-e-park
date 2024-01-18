import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../../application/dto/CreateEmployees.dto';
import { Model } from 'mongoose';
import { Encript } from '../../../../infra/encript';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_MODEL')
    private readonly employeeModel: Model<CreateEmployeeDto>,
  ) {}

  async create(data: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const employee = await this.findByEmail(data.email);
    if (employee) {
      throw new Error('Employee already exists');
    }

    const criptPass = await Encript.encriptPassword(data.password);
    const newEmployee = {
      ...data,
      password: criptPass,
    };
    return await this.employeeModel.create(newEmployee);
  }

  async getAll(): Promise<CreateEmployeeDto[]> {
    return await this.employeeModel.find().exec();
  }

  async findByEmail(email: string) {
    return await this.employeeModel.findOne({ email }).exec();
  }
}
