import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('user')
@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({
    type: User,
  })
  @ApiOperation({
    summary: 'Creates a new user',
    tags: ['user'],
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @ApiOperation({
    summary: 'Returns all users',
    tags: ['user'],
  })
  findAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOkResponse({
    type: User,
  })
  @ApiOperation({
    summary: 'Returns a user by ID',
    tags: ['user'],
  })
  findOne(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: User,
  })
  @ApiOperation({
    summary: 'Updates a user by ID',
    tags: ['user'],
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: User,
  })
  @ApiOperation({
    summary: 'Deletes a user by ID',
    tags: ['user'],
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
