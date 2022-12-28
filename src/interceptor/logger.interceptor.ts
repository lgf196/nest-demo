import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import logger from '@/utils/logger';
import { Request } from 'express';
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    console.log('first', req.originalUrl);
    return next.handle().pipe(
      tap(() => {
        logger.info(`操作成功 <===> ${req.originalUrl}`);
      }),
    );
  }
}
