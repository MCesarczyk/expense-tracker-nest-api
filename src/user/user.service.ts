import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 10);

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password,
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findUserById(id);

    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    await this.findUserById(id);

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
