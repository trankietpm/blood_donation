import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BloodRequestService } from './blood_request.service';
import { BloodRequestReqDto } from './dtos/blood_request-req.dto';
import { BloodRequestResDto } from './dtos/blood_request-res.dto';

@Controller('blood-request')
export class BloodRequestController {
  constructor(private readonly bloodRequestService: BloodRequestService) {}

  @Post()
  async create(@Body() dto: BloodRequestReqDto): Promise<BloodRequestResDto> {
    return this.bloodRequestService.create(dto);
  }

  @Get()
  async findAll(): Promise<BloodRequestResDto[]> {
    return this.bloodRequestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BloodRequestResDto> {
    return this.bloodRequestService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: BloodRequestReqDto): Promise<BloodRequestResDto> {
    return this.bloodRequestService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.bloodRequestService.remove(id);
    return { message: 'Blood request deleted successfully' };
  }
}
