import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './types/env-config.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvConfigService implements EnvConfig {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('APP_PORT'));
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
