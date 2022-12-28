import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  productListData() {
    const list = [
      { name: '胡天', age: 13 },
      { name: '黄天', age: 13 },
      { name: '小恒', age: 13 },
    ];
    return list;
  }
}
