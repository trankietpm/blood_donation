import { IsInt, IsDateString, IsEnum } from 'class-validator';
import { BloodType } from '../../common/enums/blood-type.enum';
import { BloodComponent } from '../../common/enums/blood-component.enum';
import { BloodRequestStatus } from '../../common/enums/blood-request-status.enum';
import { UrgencyLevel } from '../../common/enums/urgency-level.enum';

export class BloodRequestReqDto {
  @IsInt()
  user_id: number;

  @IsDateString()
  request_date: Date;

  @IsEnum(BloodType)
  requested_blood_type: BloodType;

  @IsEnum(BloodComponent)
  requested_blood_component: BloodComponent;

  @IsInt()
  requested_volume: number;

  @IsEnum(BloodRequestStatus)
  status: BloodRequestStatus;

  @IsEnum(UrgencyLevel)
  urgency_level: UrgencyLevel;
}
