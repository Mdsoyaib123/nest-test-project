/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const password = registerUserDto.password;
    const hashedPassword = await bcrypt?.hash(password, 10);
    registerUserDto.password = hashedPassword;

    const user = await this.usersService.createUser(registerUserDto);

    const accessToken = await this.jwtService.signAsync(
      { email: user?.data?.email, role: user?.data?.role },
      { secret: 'your_jwt_secret_key', expiresIn: '1h' },
    );

    return { ...user, accessToken };
  }

  loginUser() {
    return { message: 'User logged in successfully' };
  }
}
