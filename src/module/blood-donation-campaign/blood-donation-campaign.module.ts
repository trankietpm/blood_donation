import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodDonationCampaign } from './blood-donation-campaign.entity';
import { User } from '../user/user.entity';
import { BloodDonationCampaignService } from './blood-donation-campaign.service';
import { BloodDonationCampaignController } from './blood-donation-campaign.controller';
import { CampaignRegistration } from '../campaign-registration/campaign-registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodDonationCampaign, User, CampaignRegistration])],
  providers: [BloodDonationCampaignService],
  controllers: [BloodDonationCampaignController],
  exports: [TypeOrmModule, BloodDonationCampaignService],
})
export class BloodDonationCampaignModule {}
