import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User }                                                          from '../entities/user.entity';
import { Express }                                                       from '../interfaces/current-user.interface';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<Express.Request>();

    if (request.currentUser === undefined)
      throw new UnauthorizedException('No current user0old was found');

    return request.currentUser;
  },
);
