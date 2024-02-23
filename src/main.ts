import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustHttpExceptionFilter } from './cust-http-exception/cust-http-exception.filter';
import { ResStatusInterceptor } from './res_status/res_status.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResStatusInterceptor());
  app.useGlobalFilters(new CustHttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
