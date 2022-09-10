import { Body, Controller, Post }   from '@nestjs/common';
import { ApiResponse, ApiTags }     from '@nestjs/swagger';
import { UserDto }                  from '../dto/user.dto';
import { Serialize }                from '../../commons/serialize.interceptor';
import { User }                     from '../entities/user.entity';
import { AuthDto }                  from '../dto/auth.dto';
import { AuthService }              from './auth.service';
import { CatchEntityErrorsHandler } from '../../commons/entity-errors-handler.filter';

@ApiTags('auth')
@Serialize(UserDto)
@Controller('auth')
@CatchEntityErrorsHandler(User.name)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: UserDto })
  async signIn(@Body() auth: AuthDto): Promise<User> {
    return await this.authService.signIn(auth);
  }

}
