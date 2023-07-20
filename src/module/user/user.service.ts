import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/db/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getList() {
    const res = await this.prismaService.product_des.findMany({});
    return res;
    // return {
    //   code: 0,
    //   data: [1, 2, 3],
    //   mes: 'sucess',
    // };
  }
  register(userParam: any) {
    console.log('userParam', userParam);
  }
}
