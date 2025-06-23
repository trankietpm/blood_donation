import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignRegistration } from './campaign-registration.entity';
import { CampaignRegistrationService } from './campaign-registration.service';
import { CampaignRegistrationController } from './campaign-registration.controller';
import { User } from '../user/user.entity';
import { BloodDonationCampaign } from '../blood-donation-campaign/blood-donation-campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignRegistration, User, BloodDonationCampaign])],
  providers: [CampaignRegistrationService],
  controllers: [CampaignRegistrationController],
  exports: [TypeOrmModule, CampaignRegistrationService],
})
export class CampaignRegistrationModule {}
