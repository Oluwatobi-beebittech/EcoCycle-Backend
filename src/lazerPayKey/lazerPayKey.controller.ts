import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLazerPayKeyDto } from './dto/create-lazerPay-key.dto';
import { UpdateLazerPayKeyDto } from './dto/update-lazerPay-key.dto';
import { LazerPayKeyService } from './lazerPayKey.service';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'token',
})
export class LazerPayKeyController {
  constructor(private readonly lazerPayKeyService: LazerPayKeyService) {}

  @Post()
  async create(
    @Body() createLazerPayKeyDto: CreateLazerPayKeyDto,
    @Request() req,
  ): Promise<{
    statusMessage: string;
  }> {
    const {
      user: { userId },
    } = req;
    return await this.lazerPayKeyService.create(createLazerPayKeyDto, userId);
  }

  @Patch('update')
  update(
    @Body() updateLazerPayKeyDto: UpdateLazerPayKeyDto,
    @Request() req,
  ): Promise<{
    statusMessage: string;
  }> {
    const {
      user: { userId },
    } = req;
    return this.lazerPayKeyService.update(updateLazerPayKeyDto, userId);
  }
}
