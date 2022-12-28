import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from '@/module/user/user.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}
  @Get()
  getProductList() {
    return this.userService.getList();
  }
  @Get('/productList')
  productList() {
    return this.productService.productListData();
  }
}