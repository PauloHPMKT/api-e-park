import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { EnvConfigService } from './infra/env-config/env-config.service';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ProDescriber API')
    .setDescription(
      'ProDescriber API is an api for generating descriptions for products to bust sales.',
    )
    .setVersion('1.0')
    .addTag('describer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const envConfig = app.get<EnvConfigService>(EnvConfigService);
  const port = envConfig.getAppPort();
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app
    .listen(port)
    .then(() =>
      logger.log(`[DESCRIBER_API] is running on http://localhost:${port}`),
    )
    .catch((err) => logger.error(err));
}
bootstrap();
