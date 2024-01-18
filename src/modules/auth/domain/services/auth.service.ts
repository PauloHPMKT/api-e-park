import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/modules/employees/domain/services/employees.service';
import { Encript } from 'src/infra/encript';

@Injectable()
export class AuthService {
  constructor(private readonly employeeService: EmployeesService) {}

  async login() {
    return 'feito login';
  }

  async validateUser(email: string, password: string) {
    const user = await this.employeeService.findByEmail(email);
    if (user) {
      const companeValidPass = await Encript.comparePassword(
        password,
        user.password,
      );

      if (companeValidPass) {
        user.password = undefined;
        return user;
      }
    }
    throw new Error('Invalid credentials');
  }
}
