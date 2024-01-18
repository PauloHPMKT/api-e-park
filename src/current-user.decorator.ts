import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { EmployeeEntity } from './modules/employees/domain/entities/Employee';
import { AuthRequest } from './infra/models/auth-request';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): EmployeeEntity => {
    const request = ctx
      .switchToHttp()
      .getRequest<AuthRequest<EmployeeEntity>>();
    return request.user;
  },
);
