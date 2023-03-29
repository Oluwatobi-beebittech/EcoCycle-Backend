import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../models/users/entities';
import { UsersService } from '../models/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(inputPassword, user.password))) {
      const { password, ...userDetails } = user;
      return userDetails;
    }

    return null;
  }

  async login({ email, userId }: User) {
    const payload = { email, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
