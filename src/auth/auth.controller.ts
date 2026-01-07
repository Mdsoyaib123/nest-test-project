import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.registerUser(registerUserDto);

    return {
      data: result,
    };
  }

  @Post('login')
  loginUser() {
    return { message: 'User logged in successfully' };
  }
}
