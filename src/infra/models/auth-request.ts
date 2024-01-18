import { Request } from 'express';

export interface AuthRequest<T> extends Request {
  user: T;
}
