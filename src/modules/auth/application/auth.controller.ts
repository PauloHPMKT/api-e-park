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
import { isPublic } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @isPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest<CreateEmployeeDto>) {
    return this.authService.login(req.user);
  }
}
