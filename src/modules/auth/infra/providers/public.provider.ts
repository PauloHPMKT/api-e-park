import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../application/guards/jwt-auth.guard';

export const publicProvider = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
