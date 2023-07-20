import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserService } from '@/module/user/user.service';
@Module({
  controllers: [ProductController],
  providers: [ProductService, UserService],
})
export class ProductModule {}
