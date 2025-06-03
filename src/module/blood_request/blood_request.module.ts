import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodRequest } from './blood_request.entity';
import { BloodRequestService } from './blood_request.service';
import { BloodRequestController } from './blood_request.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BloodRequest, User])],
  providers: [BloodRequestService],
  controllers: [BloodRequestController],
  exports: [TypeOrmModule],
})
export class BloodRequestModule {}
