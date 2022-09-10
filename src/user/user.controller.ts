import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService }                                                             from './user.service';
import { CreateUserDto }                                                           from './dto/create-user.dto';
import { UpdateUserDto }                                                           from './dto/update-user.dto';
import { ApiResponse, ApiTags }                                                    from '@nestjs/swagger';
import { Serialize }                                                               from '../commons/serialize.interceptor';
import { UserDto }                                                                 from './dto/user.dto';
import { User }                                                                    from './entities/user.entity';
import { CatchEntityErrorsHandler }                                                from '../commons/entity-errors-handler.filter';


@ApiTags('user')
@Serialize(UserDto)
@Controller('user')
@CatchEntityErrorsHandler(User.name)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ type: UserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ type: Array<UserDto> })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOneOrFail(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
