import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import logger from '@/utils/logger';
import { resStatusCode } from '@/utils/index';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ResponseData>>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse() as ResponseData;
    logger.error(
      `操作失败， code===>${status} msg===>${exception.message} path===>${request.originalUrl}`,
    );
    if (exceptionRes && exceptionRes.code === resStatusCode.noAuth) {
      response.status(200).json({
        ...exceptionRes,
      });
    } else {
      response.status(200).json({
        code: resStatusCode.failed,
        msg: exception.message,
        data: null,
      });
    }
  }
}
