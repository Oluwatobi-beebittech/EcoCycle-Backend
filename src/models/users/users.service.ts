import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto).save();
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      select: {
        userId: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        ecoChampion: true,
        lazerPayKey: {
          publicKey: true,
          secretKey: true,
        },
      },
      where: { email },
      relations: {
        lazerPayKey: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
