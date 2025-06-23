import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignRegistration } from './campaign-registration.entity';
import { CampaignRegistrationReqDto } from './dtos/campaign-registration-req.dto';
import { CampaignRegistrationResDto } from './dtos/campaign-registration-res.dto';
import { User } from '../user/user.entity';
import { BloodDonationCampaign } from '../blood-donation-campaign/blood-donation-campaign.entity';
import { RegistrationStatus } from '../common/enums/campaign-registration.enum';

@Injectable()
export class CampaignRegistrationService {
  constructor(
    @InjectRepository(CampaignRegistration)
    private readonly regRepo: Repository<CampaignRegistration>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(BloodDonationCampaign)
    private readonly campaignRepo: Repository<BloodDonationCampaign>,
  ) {}

  async create(dto: CampaignRegistrationReqDto): Promise<CampaignRegistrationResDto> {
    const user = await this.userRepo.findOne({ where: { user_id: dto.userId } });
    const campaign = await this.campaignRepo.findOne({ where: { id: dto.campaignId } });
    if (!user || !campaign) throw new NotFoundException('User or Campaign not found');

    const existingRegistration = await this.regRepo.findOne({
      where: {
        user: { user_id: dto.userId },
        campaign: { id: dto.campaignId },
      },
    });

    if (existingRegistration) {
      throw new ConflictException('Bạn đã đăng ký tham gia chiến dịch này rồi.');
    }

    const reg = this.regRepo.create({
      user,
      campaign,
      status: Object.values(RegistrationStatus).includes(dto.status as RegistrationStatus)
        ? (dto.status as RegistrationStatus)
        : RegistrationStatus.CONFIRMED,
      note: dto.note,
    });
    const saved = await this.regRepo.save(reg);
    return this.toResDto(saved);
  }

  async findAll(): Promise<CampaignRegistrationResDto[]> {
    const registrations = await this.regRepo.find({ relations: ['user', 'campaign'] });
    return registrations.map(r => this.toResDto(r));
  }

  async findByCampaign(campaignId: number): Promise<CampaignRegistrationResDto[]> {
    const registrations = await this.regRepo.find({ where: { campaign: { id: campaignId } }, relations: ['user', 'campaign'] });
    return registrations.map(r => this.toResDto(r));
  }

  async updateStatus(id: number, status: RegistrationStatus, note?: string): Promise<CampaignRegistrationResDto> {
    const reg = await this.regRepo.findOne({ where: { id }, relations: ['user', 'campaign'] });
    if (!reg) throw new NotFoundException('Registration not found');
    reg.status = status;
    if (note !== undefined) reg.note = note;
    await this.regRepo.save(reg);
    return this.toResDto(reg);
  }

  private toResDto(reg: CampaignRegistration): CampaignRegistrationResDto {
    return {
      id: reg.id,
      campaignId: reg.campaign.id,
      campaignName: reg.campaign.name,
      userId: reg.user.user_id,
      userName: reg.user.full_name,
      phone: reg.user.phone_number,
      campaignDate: reg.campaign.activeTime,
      address: reg.campaign.address,
      status: reg.status,
      note: reg.note,
      registeredAt: reg.registeredAt,
    };
  }
}
