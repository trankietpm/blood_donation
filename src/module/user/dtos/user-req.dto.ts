import { BloodType } from '../../common/enums/blood-type.enum';
import { UserRole } from '../../common/enums/user-role.enum';
import { IsString, IsEmail, IsEnum, IsOptional, Matches, IsNumber } from 'class-validator';

export class UserReqDto {
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

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: 'male' | 'female' | 'other';

  @IsOptional()
  birthday?: Date;

  @IsOptional()
  @IsString()
  avatar_image?: string;
}
