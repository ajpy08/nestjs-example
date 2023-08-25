import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'mysql')
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ where: { active: true } });
  }

  async findOne(id: number): Promise<User> {
    const userExist = await this.usersRepository.findOne({
      where: { id, active: true },
    });
    if (!userExist) {
      throw new NotFoundException('User not exist');
    }
    return userExist;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id, active: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.update(id, updateUserDto);

    return { ...user, ...updateUserDto };
  }

  async remove(id: number): Promise<any> {
    const user = await this.usersRepository.update(id, { active: false });

    if (user.affected === 0) {
      throw new UnprocessableEntityException('User not deleted');
    }

    return {
      message: 'User deleted',
    };
  }
}
