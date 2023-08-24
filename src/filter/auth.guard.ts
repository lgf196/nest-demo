import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { resStatusCode } from '@/utils/index';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getMetadata = this.Reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log('getMetadata', getMetadata);
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    if (req.query.id && getMetadata?.includes(req.query.id as string)) {
      return true;
    } else {
      throw new UnauthorizedException({
        code: resStatusCode.noAuth,
        message: '没有权限',
        data: null,
      });
    }
  }
}
