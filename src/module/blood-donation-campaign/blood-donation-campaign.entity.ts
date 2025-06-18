import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';

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

  @ManyToMany(() => User)
  @JoinTable({
    name: 'campaign_user',
    joinColumn: {
      name: 'campaign_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id'
    }
  })
  registeredUsers: User[];
}
