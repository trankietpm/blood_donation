import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { BloodDonationCampaignService } from './blood-donation-campaign.service';
import { BloodDonationCampaignReqDto } from './dtos/blood-donation-campaign-req.dto';

@Controller('blood-donation-campaign')
export class BloodDonationCampaignController {
  constructor(private readonly service: BloodDonationCampaignService) {}

  @Get('search')
  async searchByDateRange(
    @Query('start') start?: string,
    @Query('end') end?: string
  ) {
    // Nếu không truyền ngày thì trả về all
    const startDate = start ? new Date(start) : undefined;
    const endDate = end ? new Date(end) : undefined;
    return this.service.searchByDateRange(startDate, endDate);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() dto: BloodDonationCampaignReqDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: BloodDonationCampaignReqDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
