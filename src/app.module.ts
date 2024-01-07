import { Module } from '@nestjs/common';
import { OpenaiModule } from './modules/openai/openai.module';
@Module({
  imports: [OpenaiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
