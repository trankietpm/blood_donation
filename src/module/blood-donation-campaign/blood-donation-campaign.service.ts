import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { BloodDonationCampaign } from './blood-donation-campaign.entity';
import { BloodDonationCampaignReqDto } from './dtos/blood-donation-campaign-req.dto';
import { BloodRequestStatus } from '../common/enums/blood-request-status.enum';

@Injectable()
export class BloodDonationCampaignService {
  constructor(
    @InjectRepository(BloodDonationCampaign)
    private readonly campaignRepo: Repository<BloodDonationCampaign>,
  ) {}

  async findAll() {
    const campaigns = await this.campaignRepo.find({ relations: ['registrations'] });
    return campaigns.map(c => ({
      ...c,
      registered: c.registrations?.length || 0,
      registrations: c.registrations,
      status: this.getStatus(c.activeTime),
    }));
  }

  async findOne(id: number) {
    const c = await this.campaignRepo.findOne({ where: { id }, relations: ['registrations'] });
    return {
      ...c,
      registered: c.registrations?.length || 0,
      registrations: c.registrations,
      status: this.getStatus(c.activeTime),
    };
  }

  getStatus(activeTime: Date): BloodRequestStatus {
    const now = new Date();
    const active = new Date(activeTime);
    if (now.toDateString() === active.toDateString()) return BloodRequestStatus.ONGOING;
    if (now < active) return BloodRequestStatus.UPCOMING;
    return BloodRequestStatus.ENDED;
  }

  async create(dto: BloodDonationCampaignReqDto) {
    const campaign = this.campaignRepo.create({
      name: dto.name,
      address: dto.address || 'Vinhomes Grand Park, Long Bình, Thủ Đức, HCM',
      activeTime: dto.activeTime,
      donateTime: dto.donateTime,
      max: dto.max,
    });
    return this.campaignRepo.save(campaign);
  }

  async update(id: number, dto: BloodDonationCampaignReqDto) {
    const campaign = await this.campaignRepo.findOne({ where: { id } });
    if (!campaign) return null;
    campaign.name = dto.name;
    campaign.activeTime = dto.activeTime;
    campaign.donateTime = dto.donateTime;
    campaign.max = dto.max;
    return this.campaignRepo.save(campaign);
  }

  async remove(id: number) {
    return this.campaignRepo.delete(id);
  }

  async searchByDateRange(start?: Date, end?: Date) {
    if (!start || !end) {
      // Nếu không truyền ngày, trả về tất cả
      return this.findAll();
    }
    const campaigns = await this.campaignRepo.find({
      where: {
        activeTime: Between(start, end),
      },
      relations: ['registrations'],
    });
    return campaigns.map(c => ({
      ...c,
      registered: c.registrations?.length || 0,
      registrations: c.registrations,
      status: this.getStatus(c.activeTime),
    }));
  }
}
