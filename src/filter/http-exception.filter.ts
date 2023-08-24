import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import logger from '@/utils/logger';
import { resStatusCode } from '@/utils/index';
import { Prisma } from '@prisma/client';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ResponseData>>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // 对数据库错误进行拦截
      response.status(200).json({
        code: resStatusCode.failed,
        message: exception.message,
        data: null,
      });
    } else {
      // 权限，业务逻辑错误拦截
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      logger.error(
        `操作失败， code===>${status} msg===>${exception.message} path===>${request.originalUrl}`,
      );
      // console.log('exception', exception);

      if (exception.getResponse) {
        const exceptionRes = exception.getResponse() as ResponseData;
        if (exceptionRes && exceptionRes.code === resStatusCode.noAuth) {
          response.status(200).json({
            ...exceptionRes,
          });
        } else {
          response.status(200).json({
            code: resStatusCode.failed,
            message: exception.message,
            data: null,
          });
        }
      } else {
        response.status(200).json({
          code: resStatusCode.failed,
          message: exception.message,
          data: null,
        });
      }
    }
  }
}
