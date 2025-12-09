import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  @Post('register')
  register() {
    const result = this.authService.registerUser();
    return result;
  }

  @Post('login')
  login() {
    return { message: 'User logged in successfully' };
  }
}
