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
  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }
  getGPTAPIKey(): string {
    return this.configService.get<string>('OPENAI_API_KEY');
  }
  getOrganizationsAPIKey(): string {
    return this.configService.get<string>('ORGANIZATION_KEY');
  }
  getSecretKey(): string {
    return this.configService.get<string>('SECRET_KEY');
  }
}
