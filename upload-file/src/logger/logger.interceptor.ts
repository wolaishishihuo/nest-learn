import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request: Request = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        tap(() =>
          new Logger().log(
            `method=${request.method} url=${request.url}, After...${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
