import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities';
import { CreateLazerPayKeyDto } from './dto/create-lazerPay-key.dto';
import { UpdateLazerPayKeyDto } from './dto/update-lazerPay-key.dto';
import { LazerPayKey } from './entities';

@Injectable()
export class LazerPayKeyService {
  constructor(
    @InjectRepository(LazerPayKey)
    private lazerPayKeyRepository: Repository<LazerPayKey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async retrieveApiKeys(userId: string): Promise<CreateLazerPayKeyDto> {
    const { lazerPayKey } = await this.userRepository.findOne({
      where: { userId },
      relations: {
        lazerPayKey: true,
      },
    });

    return {
      publicKey: lazerPayKey?.publicKey ?? '',
      secretKey: lazerPayKey?.secretKey ?? '',
    };
  }

  async create(
    saveLazerPayKeyDto: CreateLazerPayKeyDto,
    userId: string,
  ): Promise<{
    statusText: string;
  }> {
    const lazerPayKey = this.lazerPayKeyRepository.create(saveLazerPayKeyDto);
    await lazerPayKey.save();

    const { affected } = await this.userRepository.update(userId, {
      lazerPayKey,
    });

    return Boolean(affected)
      ? {
          statusText: 'Tokens saved successfully',
        }
      : {
          statusText: 'Tokens could not be saved',
        };
  }

  async update(
    updateLazerPayKeyDto: UpdateLazerPayKeyDto,
    userId: string,
  ): Promise<{
    statusText: string;
  }> {
    const { lazerPayKey } = await this.userRepository.findOne({
      where: { userId },
      relations: {
        lazerPayKey: true,
      },
    });
    const { affected } = await this.lazerPayKeyRepository.update(
      { lazerPayKeyId: lazerPayKey.lazerPayKeyId },
      updateLazerPayKeyDto,
    );

    return Boolean(affected)
      ? {
          statusText: 'Tokens updated successfully',
        }
      : {
          statusText: 'Tokens could not be updated',
        };
  }
}
