import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BloodRequest } from './blood_request.entity';
import { BloodRequestReqDto } from './dtos/blood_request-req.dto';
import { User } from '../user/user.entity';

@Injectable()
export class BloodRequestService {
  constructor(
    @InjectRepository(BloodRequest)
    private readonly bloodRequestRepository: Repository<BloodRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: BloodRequestReqDto): Promise<BloodRequest> {
    const user = await this.userRepository.findOne({ where: { user_id: dto.user_id } });
    if (!user) {
      throw new BadRequestException('User ID không tồn tại');
    }
    const entity = this.bloodRequestRepository.create(dto);
    return this.bloodRequestRepository.save(entity);
  }

  async findAll(): Promise<BloodRequest[]> {
    return this.bloodRequestRepository.find();
  }

  async findOne(id: number): Promise<BloodRequest> {
    const req = await this.bloodRequestRepository.findOne({ where: { request_id: id } });
    if (!req) throw new NotFoundException('Blood request not found');
    return req;
  }

  async update(id: number, dto: BloodRequestReqDto): Promise<BloodRequest> {
    const req = await this.findOne(id);
    Object.assign(req, dto);
    return this.bloodRequestRepository.save(req);
  }

  async remove(id: number): Promise<void> {
    const req = await this.findOne(id);
    await this.bloodRequestRepository.remove(req);
  }
}
