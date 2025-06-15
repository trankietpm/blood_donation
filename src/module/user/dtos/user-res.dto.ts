import { BloodType } from '../../common/enums/blood-type.enum';
import { UserRole } from '../../common/enums/user-role.enum';

export class UserResDto {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: number;
  blood_type: BloodType;
  role: UserRole;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: Date;
  avatar_image?: string;
}
