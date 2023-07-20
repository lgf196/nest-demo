import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { PrismaModule } from '@/db/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'; // 读取.env文件里面的变量的
@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
