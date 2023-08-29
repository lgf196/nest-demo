import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserService } from '@/module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '@/interceptor/token.guard';
@Module({
  imports: [JwtModule.register({ secret: 'lgf' })],
  controllers: [ProductController],
  providers: [ProductService, UserService, JwtService, TokenService],
})
export class ProductModule {}
