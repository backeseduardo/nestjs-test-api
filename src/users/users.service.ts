import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  find(): Promise<User[]> {
    return User.find();
  }

  async create(name: string, age?: number): Promise<number> {
    const userExits = await User.findOne({
      name,
    });

    if (userExits) {
      throw new HttpException('This user already exists', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.name = name;
    user.age = age;

    const { id } = await user.save();

    return id;
  }

  async delete(id: number): Promise<void> {
    const user = await User.findOne(id);

    if (!user) {
      throw new HttpException('This user does not exist', HttpStatus.NOT_FOUND);
    }

    await user.remove();
  }

}
