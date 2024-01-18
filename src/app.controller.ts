import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { isPublic } from './modules/auth/application/decorators/public.decorator';
import { CurrentUser } from './current-user.decorator';
import { EmployeeEntity } from './modules/employees/domain/entities/Employee';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @isPublic()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('me')
  getMe(@CurrentUser() user: EmployeeEntity): EmployeeEntity {
    return user;
  }
}
