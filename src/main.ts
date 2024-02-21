import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustHttpExceptionFilter } from './cust-http-exception/cust-http-exception.filter';
import { ResStatusInterceptor } from './res_status/res_status.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.useGlobalFilters(new CustHttpExceptionFilter());
  app.useGlobalInterceptors(new ResStatusInterceptor());
  await app.listen(3000);
}
bootstrap();
