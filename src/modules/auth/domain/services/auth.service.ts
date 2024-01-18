import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/modules/employees/domain/services/employees.service';
import { Encript } from 'src/infra/encript';
import { PayloadProps } from 'src/infra/models/payload-props';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/infra/models/token';
import { CreateEmployeeDto } from 'src/modules/employees/application/dto/CreateEmployees.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: CreateEmployeeDto): Token {
    const payload: PayloadProps = {
      sub: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      role_gpt_generate: user.role_gpt_generate,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
      user,
    };
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
