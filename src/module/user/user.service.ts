import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getList() {
    return {
      code: 0,
      data: [1, 2, 3],
      mes: 'sucess',
    };
  }
  register(userParam: any) {
    console.log('userParam', userParam);
  }
}
