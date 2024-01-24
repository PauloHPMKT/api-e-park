import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OpenaiController } from './application/openai.controller';
import { OpenaiService } from './domain/services/openai.service';
import { EnvConfigModule } from 'src/infra/env-config/env-config.module';
import { EnvConfigService } from 'src/infra/env-config/env-config.service';
import { DatabaseModule } from '../database/database.module';
import { AuthOpenaiMiddleware } from './application/middlewares/auth-openai.middleware';
import { AuthModule } from '../auth/auth.module';
import { openaiDbProviders } from './infra/providers/openai-database.providers';
import { openaiProviders } from './infra/providers/openai.providers';

@Module({
  imports: [AuthModule, DatabaseModule, EnvConfigModule.forRoot()],
  controllers: [OpenaiController],
  providers: [
    EnvConfigService,
    OpenaiService,
    ...openaiDbProviders,
    ...openaiProviders,
  ],
})
export class OpenaiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthOpenaiMiddleware).forRoutes('openai/chat');
  }
}
