import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/modules/employees/domain/services/employees.service';
import { Encript } from 'src/modules/employees/infra/encript';

@Injectable()
export class AuthService {
  constructor(private readonly employeeService: EmployeesService) {}

  async login(user: any) {
    console.log(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.employeeService.findByEmail(email);
    if (user) {
      const isMatchPass = await Encript.comparePassword(
        password,
        user.password,
      );

      if (isMatchPass) {
        user.password = undefined;
        return user;
      }
    }
    throw new Error('Invalid credentials');
  }
}
