export class BloodDonationCampaignReqDto {
  name: string;
  address?: string;
  activeTime: Date;
  donateTime: any;
  max: number;
  registeredUserIds?: number[];
}
