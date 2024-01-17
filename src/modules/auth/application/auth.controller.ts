import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Request() req: any) {
    return this.authService.login(req);
  }
}
