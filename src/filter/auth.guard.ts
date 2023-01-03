import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { resStatusCode } from '@/utils/index';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    if (req.query.id) {
      return true;
    } else {
      throw new UnauthorizedException({
        code: resStatusCode.noAuth,
        msg: '没有权限',
        data: null,
      });
    }
  }
}
