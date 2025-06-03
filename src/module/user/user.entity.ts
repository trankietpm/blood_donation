import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BloodType } from '../common/enums/blood-type.enum';
import { UserRole } from '../common/enums/user-role.enum';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  user_name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'int' })
  phone_number: number;

  @Column({ type: 'enum', enum: BloodType })
  blood_type: BloodType;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  is_ready_to_donate: boolean;

  @Column({ type: 'date', nullable: true })
  last_donation_date: Date;
}
