import { UserResDto } from '../../user/dtos/user-res.dto';
import { BloodRequestStatus } from '../../common/enums/blood-request-status.enum';

export class BloodDonationCampaignResDto {
  id: number;
  name: string;
  address: string;
  activeTime: Date;
  donateTime: any;
  max: number;
  registered: number;
  registeredUsers: UserResDto[];
  status: BloodRequestStatus;
}
