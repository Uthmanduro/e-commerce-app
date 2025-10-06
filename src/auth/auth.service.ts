import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    try {
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        if (await this.verifyPassword(user, password, user.password)) {
          delete (user as any).password;

          const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            username: user.username,
          });
          return {
            message: 'Login successful',
            data: { accessToken, ...user },
          };
        }
      }

      return {
        message: 'Invalid username or password',
        data: null,
      };
    } catch (error) {
      return error;
    }
  }

  async signup(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = this.hashpassword(createUserDto.password);
      const newUser: CreateUserDto = {
        ...createUserDto,
        password: hashedPassword,
      };
      return await this.userService.create(newUser);
    } catch (error) {
      return error;
    }
  }

  hashpassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  async verifyPassword(user: User, password: string, hashedPassword: string) {
    return user && (await bcrypt.compare(password, hashedPassword));
  }
}
