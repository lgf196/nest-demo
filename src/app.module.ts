import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config'; // 读取.env文件里面的变量的
@Module({
  imports: [ConfigModule.forRoot(), UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
