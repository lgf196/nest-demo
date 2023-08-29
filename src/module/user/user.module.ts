import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtSecret } from '@/constants';
import { TokenService } from '@/interceptor/token.guard';
@Module({
  imports: [JwtModule.register({ secret: JwtSecret })],
  controllers: [UserController],
  providers: [JwtService, UserService, TokenService],
})
export class UserModule {}
