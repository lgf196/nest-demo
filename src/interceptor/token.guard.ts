import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { awaitWrap, resStatusCode } from '@/utils/index';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { user } from '@prisma/client';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private Reflector: Reflector,
    private readonly JwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const token = req.headers.accesstoken as string;
    if (!token) {
      throw new UnauthorizedException('未登录，请登录');
    }
    try {
      const userInfo = this.JwtService.verify(token, {
        secret: JwtSecret,
      });
    } catch (error) {
      throw new UnauthorizedException({
        code: resStatusCode.noLogin,
        message: '登录失效，请登录',
        data: null,
      });
    }
    return true;
  }
}

@Injectable()
export class TokenService {
  constructor(private readonly JwtService: JwtService) {}
  createToken(payload: Pick<user, 'id' | 'userName'>) {
    return this.JwtService.sign(payload, { expiresIn: 360, secret: JwtSecret });
  }
}
