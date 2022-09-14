import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UserService }                                                from '../user.service';
import { Express }                                                    from '../interfaces/current-user.interface';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Express.Request>();
    const id      = request.user?.id;

    if (id !== undefined)
      request.currentUser = await this.userService.findOneOrFail(id);

    return next.handle();
  }
}
