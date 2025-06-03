import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BloodType } from '../common/enums/blood-type.enum';
import { BloodComponent } from '../common/enums/blood-component.enum';
import { BloodRequestStatus } from '../common/enums/blood-request-status.enum';
import { UrgencyLevel } from '../common/enums/urgency-level.enum';
import { User } from '../user/user.entity';

@Entity()
export class BloodRequest {
  @PrimaryGeneratedColumn()
  request_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date' })
  request_date: Date;

  @Column({ type: 'enum', enum: BloodType })
  requested_blood_type: BloodType;

  @Column({ type: 'enum', enum: BloodComponent })
  requested_blood_component: BloodComponent;

  @Column()
  requested_volume: number;

  @Column({ type: 'enum', enum: BloodRequestStatus, default: BloodRequestStatus.Pending })
  status: BloodRequestStatus;

  @Column({ type: 'enum', enum: UrgencyLevel })
  urgency_level: UrgencyLevel;
}
