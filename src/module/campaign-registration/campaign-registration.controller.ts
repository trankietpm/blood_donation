import { Controller, Post, Get, Put, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { CampaignRegistrationService } from './campaign-registration.service';
import { CampaignRegistrationReqDto } from './dtos/campaign-registration-req.dto';
import { RegistrationStatus } from '../common/enums/campaign-registration.enum';

@Controller('campaign-registration')
export class CampaignRegistrationController {
  constructor(private readonly service: CampaignRegistrationService) {}

  @Post()
  async register(@Body() dto: CampaignRegistrationReqDto) {
    return this.service.create(dto);
  }

  @Get()
  async getAll(@Query('campaignId') campaignId?: number) {
    if (campaignId) return this.service.findByCampaign(Number(campaignId));
    return this.service.findAll();
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: RegistrationStatus, note?: string }
  ) {
    return this.service.updateStatus(id, body.status, body.note);
  }
}
