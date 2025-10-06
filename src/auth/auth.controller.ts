import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signup(CreateUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    return this.authService.login(username, password);
  }
}
