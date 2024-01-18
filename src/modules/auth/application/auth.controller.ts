import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';
import { LocalAuthGuard } from './guards/strategies/local-auth.guard';
import { AuthRequest } from 'src/infra/models/auth-request';
import { CreateEmployeeDto } from 'src/modules/employees/application/dto/CreateEmployees.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest<CreateEmployeeDto>) {
    return await this.authService.login(req.user);
  }
}
