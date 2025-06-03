import { BloodType } from '../../common/enums/blood-type.enum';
import { UserRole } from '../../common/enums/user-role.enum';

export class UserResDto {
  user_id: number;
  user_name: string;
  full_name: string;
  email: string;
  phone_number: number;
  blood_type: BloodType;
  role: UserRole;
  is_ready_to_donate: boolean;
  last_donation_date?: Date;
}
