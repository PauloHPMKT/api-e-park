import { Module } from '@nestjs/common';
import { OpenaiController } from './application/openai.controller';
import { OpenaiService } from './domain/services/openai.service';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { openaiProviders } from './infra/providers/openai.providers';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule, EnvConfigModule.forRoot()],
  controllers: [OpenaiController],
  providers: [EnvConfigService, OpenaiService, ...openaiProviders],
})
export class OpenaiModule {}
