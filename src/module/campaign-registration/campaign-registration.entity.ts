import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { BloodDonationCampaign } from '../blood-donation-campaign/blood-donation-campaign.entity';
import { RegistrationStatus } from '../common/enums/campaign-registration.enum';

@Entity('campaign_registration')
export class CampaignRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BloodDonationCampaign, { eager: true })
  campaign: BloodDonationCampaign;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @Column({ type: 'enum', enum: RegistrationStatus, default: RegistrationStatus.CONFIRMED })
  status: RegistrationStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  note: string;

  @CreateDateColumn()
  registeredAt: Date;
}