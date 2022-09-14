import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Query,
}                                   from '@nestjs/common';
import { UserService }              from './user.service';
import { UpdateUserDto }            from './dto/update-user.dto';
import { ApiResponse, ApiTags }     from '@nestjs/swagger';
import { UserDto }                  from './dto/user.dto';
import { User }                     from './entities/user.entity';
import { CatchEntityErrorsHandler } from '../commons/filters/entity-errors-handler.filter';
import { PageOptionsDto }           from '../commons/pagination/page-options.dto';
import { PageDto }                  from '../commons/pagination/page.dto';
import { ApiPaginatedResponse }     from '../commons/pagination/api-paginated-response.decorator';
import { Serialize }                from '../commons/serialize.interceptor';
import { plainToInstance }          from 'class-transformer';
import { ApiJwtAuth }               from './auth/decorators/api-jwt-auth.decorator';
import { CurrentUser }              from './decorators/current-user.decorator';
import { AuthService }              from './auth/auth.service';


@ApiTags('user')
@Controller('user')
@CatchEntityErrorsHandler(User.name)
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService,
              private authService: AuthService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  async findAll(@Query('pageOptions') pageOptions: PageOptionsDto): Promise<PageDto<UserDto>> {
    const {meta, data} = await this.userService.findAllPaginated(pageOptions);
    return new PageDto<UserDto>(
      plainToInstance(UserDto, data, { excludeExtraneousValues: true }),
      meta
    );
  }

  @Get(':id')
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOneOrFail(id);
  }

  @ApiJwtAuth()
  @Patch(':id')
  @Serialize(UserDto)
  async update(@Param('id', ParseIntPipe) id: number,
               @Body() updateUserDto: UpdateUserDto,
               @CurrentUser() currentUser: User): Promise<User> {
    this.userService.checkOwnership(id, currentUser);

    if ('isAdmin' in updateUserDto && !currentUser.isAdmin)
      throw new ForbiddenException(`User ${currentUser.username} should be admin to change user.id = ${ id } admin status`)

    return await this.authService.update(id, updateUserDto);
  }

  @ApiJwtAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number,
               @CurrentUser() currentUser: User): Promise<void> {
    this.userService.checkOwnership(id, currentUser);
    await this.userService.remove(id);
  }

}
