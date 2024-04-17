import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Validation')
  .setDescription('Validation application for Users')
  .setVersion('1.0')
  .addTag('Order')
  .addTag('Product')
  .addTag('Custom')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
