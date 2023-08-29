import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  Next,
  Query,
  Headers,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';
import { user } from '@prisma/client';
import md5 from 'md5';
import { RequiredValidationPipe } from '@/interceptor/validation.pipe';
import { PrismaService } from '@/db/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenGuard } from '@/interceptor/token.guard';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly PrismaService: PrismaService,
    private readonly JwtService: JwtService,
  ) {}
  @Post('/login')
  login(
    @Body(new RequiredValidationPipe(['userName', 'password', 'code'])) query,
    @Session() session,
  ) {
    return this.userService.login(query, session.captchas);
  }
  @Get('/code')
  createCode(@Session() session, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,
    });
    session.captchas = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('/add')
  async addUser(
    @Body(new RequiredValidationPipe(['userName', 'password'])) query,
  ) {
    return this.userService.add(query);
  }
  @Post('/remove')
  removeUser(
    @Body(new RequiredValidationPipe(['ids'])) query: { ids: number[] },
  ) {
    return this.userService.removeUser(query.ids);
  }
  @Get('/userList')
  @UseGuards(TokenGuard)
  getUserList() {
    return this.PrismaService.user.findMany();
  }
}
