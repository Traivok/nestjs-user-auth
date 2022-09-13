import { Body, Controller, ForbiddenException, Get, HttpCode, Logger, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
}                                                                                                 from '@nestjs/swagger';
import { UserDto }                                                                                from '../dto/user.dto';
import { Serialize }                                                                              from '../../commons/serialize.interceptor';
import {
  User,
  UserRoles,
}                                                                                                 from '../entities/user.entity';
import { Request as ExpressRequest }                                                              from 'express';
import { AuthService }                                                                            from './auth.service';
import { CatchEntityErrorsHandler }                                                               from '../../commons/filters/entity-errors-handler.filter';
import { CreateUserDto }                                                                          from '../dto/create-user.dto';
import { UserService }                                                                            from '../user.service';
import { AuthGuard }                                                                              from '@nestjs/passport';
import { AuthDto }                                                                                from '../dto/auth.dto';
import { Jwt, JwtPayload }                                                                        from './Jwt';
import { ApiJwtAuth }                                                                             from './decorators/api-jwt-auth.decorator';

namespace Express {
  interface Request {
    user: User | null;
  }
}

@ApiTags('auth')
@Controller('auth')
@CatchEntityErrorsHandler(User.name)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService,
              private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: AuthDto, required: true })
  @ApiResponse({ type: Jwt })
  async login(@Request() req: ExpressRequest): Promise<Jwt> {
    return await this.authService.loginJwt(req.user as User);
  }

  @Post('sign-up')
  @ApiResponse({ type: UserDto })
  @Serialize(UserDto)
  async signUp(@Body() newUser: CreateUserDto): Promise<User> {
    if (newUser.role && newUser.role !== UserRoles.user) {
      throw new ForbiddenException('New users should have \'User\' role');
    }

    return await this.authService.signUp(newUser);
  }

  @ApiJwtAuth()
  @Get('profile')
  @Serialize(UserDto)
  async profile(@Request() req: ExpressRequest): Promise<User> {
    const payload = req.user as JwtPayload;
    return this.userService.findOneOrFail(payload.userId);
  }
}
