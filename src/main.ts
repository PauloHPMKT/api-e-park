import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3002;
  await app
    .listen(port)
    .then(() =>
      logger.log(`[DESCRIBER_API] is running on http://localhost:${port}`),
    )
    .catch((err) => logger.error(err));
}
bootstrap();
