import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CampaignRegistration } from '../campaign-registration/campaign-registration.entity';

@Entity('blood_donation_campaign')
export class BloodDonationCampaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, default: 'Vinhomes Grand Park, Long Bình, Thủ Đức, HCM' })
  address: string;

  @Column({ type: 'date' })
  activeTime: Date;

  @Column({ type: 'json' })
  donateTime: any; // object

  @Column({ type: 'int', default: 0 })
  max: number;

  @OneToMany(() => CampaignRegistration, reg => reg.campaign)
  registrations: CampaignRegistration[];
}
