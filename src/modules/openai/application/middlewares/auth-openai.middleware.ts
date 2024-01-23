import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/domain/services/auth.service';

@Injectable()
export class AuthOpenaiMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7);
      const decodedToken = await this.authService.verifyToken(token);

      if (decodedToken) req['user'] = decodedToken;
    }
    next();
  }
}
