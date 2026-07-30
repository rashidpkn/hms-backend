import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(compression());
  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Hospital Management System API')
    .setDescription('API documentation for Hospital Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('HMS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
