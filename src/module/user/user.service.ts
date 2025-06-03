import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserReqDto } from './dtos/user-req.dto';
import { pendingUsers } from './pending-user.store';
import { randomBytes } from 'crypto';
import { MailService } from './mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    if (!id) throw new NotFoundException('User not found');
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, userReqDto: UserReqDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, userReqDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async register(userReqDto: UserReqDto): Promise<{ message: string }> {
    const existingEmail = await this.userRepository.findOne({ where: { email: userReqDto.email } });
    if (existingEmail) throw new BadRequestException('Email already exists');
    const existingUserName = await this.userRepository.findOne({ where: { user_name: userReqDto.user_name } });
    if (existingUserName) throw new BadRequestException('Username already exists');

    const token = randomBytes(32).toString('hex');
    pendingUsers.set(token, userReqDto);

    const confirmUrl = `http://localhost:3123/user/confirm/${token}`;
    await this.mailService.sendMail(
      userReqDto.email,
      'Xác nhận đăng ký tài khoản BloodCareSystem',
      `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
        <div style="text-align: center;">
          <img src="https://tinypic.host/images/2025/06/03/logo.png" alt="BloodCareSystem" width="120" style="margin-bottom: 16px;" />
          <h2 style="color: #d32f2f;">Chào mừng bạn đến với BloodCareSystem!</h2>
        </div>
        <p>Xin chào <b>${userReqDto.full_name}</b>,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại <b>BloodCareSystem</b>.</p>
        <p>Vui lòng nhấn vào nút bên dưới để xác nhận đăng ký:</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${confirmUrl}" style="background: #d32f2f; color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Xác nhận đăng ký
          </a>
        </div>
        <p>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email này.</p>
        <hr style="margin: 24px 0;">
        <div style="font-size: 12px; color: #888; text-align: center;">
          &copy; ${new Date().getFullYear()} BloodCareSystem. Mọi thắc mắc vui lòng liên hệ: bloodcaresystem@gmail.com
        </div>
      </div>
      `
    );

    return { message: 'Vui lòng kiểm tra email để xác nhận đăng ký.' };
  }

  async confirmRegister(token: string): Promise<{ message: string }> {
    const userReqDto = pendingUsers.get(token);
    if (!userReqDto) throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');

    const existingUser = await this.userRepository.findOne({ where: { email: userReqDto.email } });
    if (existingUser) {
      return { message: 'Tài khoản đã được xác nhận trước đó.' };
    }

    const user = this.userRepository.create({
      ...userReqDto,
      phone_number: userReqDto.phone_number ? Number(userReqDto.phone_number) : undefined,
    });
    await this.userRepository.save(user);

    return { message: 'Đăng ký thành công!' };
  }

  async login(user_name: string, password: string): Promise<{ message: string, user?: User }> {
    const user = await this.userRepository.findOne({ where: { user_name } });
    if (!user) {
      return { message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    }

    if (user.password !== password) {
      return { message: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    }

    return { message: 'Đăng nhập thành công', user };
  }
}
