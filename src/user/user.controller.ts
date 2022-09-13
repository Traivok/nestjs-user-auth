import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UserService }                                                                    from './user.service';
import { CreateUserDto }                                                                  from './dto/create-user.dto';
import { UpdateUserDto }                                                                  from './dto/update-user.dto';
import { ApiResponse, ApiTags }                                                           from '@nestjs/swagger';
import { UserDto }                                                                        from './dto/user.dto';
import { User }                                                                           from './entities/user.entity';
import { CatchEntityErrorsHandler }                                                       from '../commons/filters/entity-errors-handler.filter';
import { PageOptionsDto }                                                                 from '../commons/pagination/page-options.dto';
import { PageDto }                                                                        from '../commons/pagination/page.dto';
import { ApiPaginatedResponse }                                                           from '../commons/pagination/api-paginated-response.decorator';
import { Serialize }                                                                      from '../commons/serialize.interceptor';
import { plainToInstance }                                                                from 'class-transformer';


@ApiTags('user')
// @Serialize(UserDto)
@Controller('user')
@CatchEntityErrorsHandler(User.name)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiPaginatedResponse(UserDto)
  async findAll(@Query() pageOptions: PageOptionsDto): Promise<PageDto<UserDto>> {
    const { data, meta }: PageDto<User> = await this.userService.findAllPaginated(pageOptions);
    const users: UserDto[] = data.map(d => plainToInstance(UserDto, d, { excludeExtraneousValues: true })); // TODO decorate

    return new PageDto<UserDto>(users, meta);
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOneOrFail(id);
  }

  @Patch(':id')
  @Serialize(UserDto)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
