import { Controller, Get, UseInterceptors, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { UserService } from '@/module/user/user.service';
import { AuthGuard } from '@/filter/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
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
