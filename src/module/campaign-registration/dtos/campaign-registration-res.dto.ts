export class CampaignRegistrationResDto {
  id: number;
  campaignId: number;
  campaignName: string;
  userId: number;
  userName: string;
  phone: string;
  campaignDate: Date;
  address: string;
  status: string;
  note?: string;
  registeredAt: Date;
}
