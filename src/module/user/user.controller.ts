import { Controller, Get, Post, Body, Res, Next, Query } from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';
import { user } from '@prisma/client';
import md5 from 'md5';
import { RequiredValidationPipe } from '@/interceptor/validation.pipe';
import { PrismaService } from '@/db/prisma/prisma.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly PrismaService: PrismaService,
  ) {}
  // @Get('list')
  // getList() {
  //   return this.userService.getList();
  // }
  // @Post('/register')
  // register(@Body() body, @Res() res, @Next() next) {
  //   console.log('res', res);
  //   // res.send('dededed');
  //   // next({ statusCode: 400, message: '错误的路由' });
  //   return this.userService.register(body);
  // }
  @Post('/login')
  login(@Body(new RequiredValidationPipe(['userName', 'password'])) query) {
    return this.userService.login(query);
  }
  @Get('/code')
  createCode(@Query() query, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,
    });
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
  @Post('/add')
  async addUser(
    @Body(new RequiredValidationPipe(['userName', 'password'])) query,
  ) {
    return this.userService.add(query);
  }
}
