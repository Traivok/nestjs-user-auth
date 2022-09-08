import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService }         from './user.service';
import { CreateUserDto }       from './dto/create-user.dto';
import { UpdateUserDto }       from './dto/update-user.dto';
import { ApiOperation, ApiTags }             from '@nestjs/swagger';
import { Serialize }           from '../commons/serialize.interceptor';
import { UserDto }             from './dto/user-dto';
import { CatchEntityNotFound } from '../commons/entity-not-found.filter';
import { User } from './entities/user.entity';


@ApiTags('user')
@Serialize(UserDto)
@Controller('user')
@CatchEntityNotFound(User.name)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.userService.findOneOrFail(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
