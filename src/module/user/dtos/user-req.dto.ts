import { BloodType } from '../../common/enums/blood-type.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { IsString, IsEmail, IsEnum, IsBoolean, IsOptional, Matches, IsNumber } from 'class-validator';

export class UserReqDto {
  @IsString()
  user_name: string;    

  @IsString()
  password: string;

  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @Matches(/^\d{10}$/, { message: 'phone_number must be exactly 10 digits' })
  phone_number: number;

  @IsEnum(BloodType)
  blood_type: BloodType;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  is_ready_to_donate: boolean;

  @IsOptional()
  last_donation_date?: Date;
}
