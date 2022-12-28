import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import logger from '@/utils/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    logger.error(
      `操作失败， code===>${status} msg===>${exception.message} path===>${request.originalUrl}`,
    );
    response.status(status).json({
      code: status,
      msg: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      data: null,
    });
  }
}
