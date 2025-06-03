import { BloodType } from '../../common/enums/blood-type.enum';
import { BloodComponent } from '../../common/enums/blood-component.enum';
import { BloodRequestStatus } from '../../common/enums/blood-request-status.enum';
import { UrgencyLevel } from '../../common/enums/urgency-level.enum';

export class BloodRequestResDto {
  request_id: number;
  user_id: number;
  request_date: Date;
  requested_blood_type: BloodType;
  requested_blood_component: BloodComponent;
  requested_volume: number;
  status: BloodRequestStatus;
  urgency_level: UrgencyLevel;
}
