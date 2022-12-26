import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  count: number = 1;
  val: number;
  constructor(private readonly appService: AppService) {
    this.val = 2;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/list')
  getList(): number {
    console.log('this.count', this.count);
    return this.count + this.val;
  }
}
