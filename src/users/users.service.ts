import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return {
        newUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async getUserByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username },
      relations: ['orders'],
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
