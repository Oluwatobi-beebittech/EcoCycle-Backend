import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CreateLazerPayKeyDto } from './dto/create-lazerPay-key.dto';
import { UpdateLazerPayKeyDto } from './dto/update-lazerPay-key.dto';
import { LazerPayKeyService } from './lazerPayKey.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'token',
})
export class LazerPayKeyController {
  constructor(private readonly lazerPayKeyService: LazerPayKeyService) {}

  @Get()
  async retreiveApiKeys(@Request() req) {
    const {
      user: { userId },
    } = req;
    return await this.lazerPayKeyService.retrieveApiKeys(userId);
  }

  @Post()
  async create(
    @Body() createLazerPayKeyDto: CreateLazerPayKeyDto,
    @Request() req,
  ): Promise<{
    statusText: string;
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
    statusText: string;
  }> {
    const {
      user: { userId },
    } = req;
    return this.lazerPayKeyService.update(updateLazerPayKeyDto, userId);
  }
}
