import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errormsg: Object =
      typeof response !== 'string' && exception.getResponse();
    console.log(exception.getResponse());
    response.status(status).json({
      ...errormsg,
      // status: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
