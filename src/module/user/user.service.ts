import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/db/prisma/prisma.service';
import { user } from '@prisma/client';
import * as md5 from 'md5';
import { exclude } from '@/utils';
import { TokenService } from '@/interceptor/token.guard';
export interface LoginType extends user {
  code: string;
}
@Injectable()
export class UserService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly TokenService: TokenService,
  ) {}

  getPassword(data: user) {
    const salte = 'lgf';
    const saltPassword = data.password + salte;
    const md5Password = md5(saltPassword);
    return { saltPassword, md5Password };
  }

  async findUser(userName: string) {
    const user = await this.PrismaService.user.findFirst({
      where: {
        userName: userName || null,
      },
    });
    return user;
  }

  async add(data: user) {
    const { md5Password } = this.getPassword(data);
    const isHaveUser = await this.findUser(data.userName);
    if (isHaveUser) {
      throw new BadRequestException('用户已存在');
    }
    const formData = Object.assign({}, data, {
      password: md5Password,
    });
    await this.PrismaService.user.create({
      data: formData,
    });
    return null;
  }

  async login(data: LoginType, code: LoginType['code']) {
    const codeReg = new RegExp(data.code, 'ig');
    if (!codeReg.test(code)) {
      throw new BadRequestException('验证码不对，请输入正确的验证码');
    }
    const { md5Password } = this.getPassword(data);
    const findUser = await this.findUser(data.userName);
    if (!findUser) {
      throw new BadRequestException('用户不存在');
    }
    if (md5Password !== findUser.password) {
      throw new BadRequestException('密码不正确');
    } else {
      const token = this.TokenService.createToken({
        id: findUser.id,
        userName: findUser.userName,
      });
      console.log('first', token);
      return exclude(findUser, ['password']);
    }
  }

  async removeUser(ids: number[]) {
    let res = await this.PrismaService.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
