import { CreateEmployeeDto } from 'src/modules/employees/application/dto/CreateEmployees.dto';

export interface Token {
  access_token: string;
  user: CreateEmployeeDto;
}
