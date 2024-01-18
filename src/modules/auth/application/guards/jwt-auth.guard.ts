import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflactor: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflactor.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context) as Observable<boolean>;
    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    return super.canActivate(context);
  }
}
