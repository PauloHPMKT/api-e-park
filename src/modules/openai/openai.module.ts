import { Module } from '@nestjs/common';
import { OpenaiController } from './application/openai.controller';
import { OpenaiService } from './domain/services/openai.service';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';

@Module({
  imports: [EnvConfigModule.forRoot()],
  controllers: [OpenaiController],
  providers: [EnvConfigService, OpenaiService],
})
export class OpenaiModule {}
