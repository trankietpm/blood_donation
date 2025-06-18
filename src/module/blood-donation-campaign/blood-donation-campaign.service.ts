import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodDonationCampaign } from './blood-donation-campaign.entity';
import { BloodDonationCampaignReqDto } from './dtos/blood-donation-campaign-req.dto';
import { User } from '../user/user.entity';
import { BloodRequestStatus } from '../common/enums/blood-request-status.enum';
import { Between } from 'typeorm';

@Injectable()
export class BloodDonationCampaignService {
  constructor(
    @InjectRepository(BloodDonationCampaign)
    private readonly campaignRepo: Repository<BloodDonationCampaign>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    const campaigns = await this.campaignRepo.find({ relations: ['registeredUsers'] });
    return campaigns.map(c => ({
      ...c,
      registered: c.registeredUsers?.length || 0,
      registeredUsers: c.registeredUsers,
      status: this.getStatus(c.activeTime),
    }));
  }

  async findOne(id: number) {
    const c = await this.campaignRepo.findOne({ where: { id }, relations: ['registeredUsers'] });
    return {
      ...c,
      registered: c.registeredUsers?.length || 0,
      registeredUsers: c.registeredUsers,
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
    const users = dto.registeredUserIds ? await this.userRepo.findByIds(dto.registeredUserIds) : [];
    const campaign = this.campaignRepo.create({
      name: dto.name,
      address: dto.address || 'Vinhomes Grand Park, Long Bình, Thủ Đức, HCM',
      activeTime: dto.activeTime,
      donateTime: dto.donateTime,
      max: dto.max,
      registeredUsers: users,
    });
    return this.campaignRepo.save(campaign);
  }

  async update(id: number, dto: BloodDonationCampaignReqDto) {
    const campaign = await this.campaignRepo.findOne({ where: { id }, relations: ['registeredUsers'] });
    if (!campaign) return null;
    if (dto.registeredUserIds) {
      campaign.registeredUsers = await this.userRepo.findByIds(dto.registeredUserIds);
    }
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
      relations: ['registeredUsers'],
    });
    return campaigns.map(c => ({
      ...c,
      registered: c.registeredUsers?.length || 0,
      registeredUsers: c.registeredUsers,
      status: this.getStatus(c.activeTime),
    }));
  }
}
