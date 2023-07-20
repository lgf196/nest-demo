import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/db/prisma/prisma.service';
/**
 * 全局使用，在APP.module中引入，就可以在其他的模版中使用了，不在providers中添加了
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
