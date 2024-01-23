import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { EnvConfigModule } from '../../infra/env-config/env-config.module';
import { EnvConfigService } from '../../infra/env-config/env-config.service';

@Module({
  imports: [EnvConfigModule.forRoot()],
  providers: [EnvConfigService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
