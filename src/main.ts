import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for using class validator
  app.useGlobalPipes(new ValidationPipe());
  // for swagger
  const config = new DocumentBuilder()
    .setTitle('Nest TypeORM MySQL API')
    .setDescription('Nest TypeORM MySQL API description...')
    .setVersion('1.0')
    .addTag('APIs')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
