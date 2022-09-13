import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Post,
  Session,
}                                   from '@nestjs/common';
import { ApiResponse, ApiTags }     from '@nestjs/swagger';
import { UserDto }                  from '../dto/user.dto';
import { Serialize }                from '../../commons/serialize.interceptor';
import { User, UserRoles }         from '../entities/user.entity';
import { AuthDto }                  from '../dto/auth.dto';
import { AuthService }              from './auth.service';
import { CatchEntityErrorsHandler } from '../../commons/entity-errors-handler.filter';
import { CreateUserDto }            from '../dto/create-user.dto';
import { UserService }              from '../user.service';
import { CurrentUser }              from '../current-user.decorator';

@ApiTags('auth')
@Serialize(UserDto)
@Controller('auth')
@CatchEntityErrorsHandler(User.name)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService,
              private userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  @ApiResponse({ type: UserDto })
  async login(@Body() auth: AuthDto, @Session() session: any): Promise<User> {
    const user = await this.authService.login(auth);
    session.userId = user.id;
    return user;
  }

  @Post('logon')
  @ApiResponse({ type: UserDto })
  async logon(@Body() newUser: CreateUserDto, @Session() session: any): Promise<User> {
    if (newUser.role && newUser.role !== UserRoles.user) {
      throw new ForbiddenException("New users should have 'User' role");
    }

    return await this.userService.create(newUser);
  }

  @Get('whoami')
  async whoAmi(@CurrentUser() user: User): Promise<User> {
    if (user === null)
      throw new NotFoundException();

    this.logger.log({user});

    return user;
  }

  @Post('logout')
  logout(@Session() session: any) {
    delete session.userId;
  }

}
