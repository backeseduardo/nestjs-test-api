import { Controller, Get, Post, Body, Delete, Param, UsePipes, ParseUUIDPipe, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get()
  async get() {
    const users = await this.usersService.find();

    return users;
  }

  @Post()
  async post(@Body() createUserDto: CreateUserDto) {
    const { name, age } = createUserDto;

    const id = await this.usersService.create(name, age);

    return { id };
  }

  @Delete(':id')
  @UsePipes(new ParseIntPipe())
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }

}
