import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from '@/user/user.service';

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
