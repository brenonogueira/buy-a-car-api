import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: any, password: string) {
    const user = await this.prismaService.user.findFirst(email);
    // console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(body: any): Promise<UserModel> {
    const hash = await bcrypt.hash(body.password, 10);
    const data = {
      name: body.name,
      email: body.email,
      password: hash,
      phone: body.phone,
    };
    return await this.prismaService.user.create({ data });
  }

  async login(user: any) {
    // console.log('chegou no login do service');
    const payload = { user };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async profile(user: any) {
    return {
      id: user.user.id,
      name: user.user.name,
      email: user.user.email,
      phone: user.user.phone,
    };
  }
}
