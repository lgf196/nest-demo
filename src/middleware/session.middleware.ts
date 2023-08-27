import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export default class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
    })(req, res, next);
  }
}
