import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async createUser(registerUserDto: RegisterUserDto) {
    const userExits = await this.userModel.findOne({
      email: registerUserDto.email,
    });
    if (userExits) {
      return { success: false, message: 'User already exists' };
    }
    const res = await this.userModel.create(registerUserDto);
    return { success: true, message: 'User created successfully', data: res };
  }
}
