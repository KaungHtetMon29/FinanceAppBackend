import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log(next.handle());
    return next.handle().pipe(
      map((data) => ({
        data,
        status: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}
