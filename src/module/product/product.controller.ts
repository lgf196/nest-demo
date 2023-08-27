import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from '@/module/user/user.service';
import { AuthGuard } from '@/filter/auth.guard';
import { PrismaService } from '@/db/prisma/prisma.service';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}
  @Get()
  getProductList() {
    // return this.userService.getList();
  }
  @Get('/deslists')
  async getDesList() {
    const res = await this.prismaService.user.findMany();
    return res;
  }
  @UseGuards(AuthGuard)
  @Get('/productList')
  @SetMetadata('roles', ['admin'])
  productList() {
    return this.productService.productListData();
  }
}
