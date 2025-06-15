import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserReqDto } from './dtos/user-req.dto';
import { UserResDto } from './dtos/user-res.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userReqDto: UserReqDto,
  ): Promise<UserResDto> {
    return this.userService.update(id, userReqDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }

  @Post('register')
  async register(@Body() userReqDto: UserReqDto) {
    return this.userService.register(userReqDto);
  }

  @Get('confirm/:token')
  async confirmRegister(@Param('token') token: string) {
    return this.userService.confirmRegister(token);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body.email, body.password);
  }
}
