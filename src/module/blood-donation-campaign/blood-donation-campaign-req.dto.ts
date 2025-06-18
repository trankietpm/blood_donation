export class BloodDonationCampaignReqDto {
  name: string;
  address?: string; // optional, default in entity
  activeTime: any; // object
  donateTime: any; // object
  max: number;
  registeredUserIds?: number[];
} 