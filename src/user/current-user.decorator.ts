import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request }                                        from 'express';
import { User }                                           from './entities/user.entity';

const logger = new Logger('CurrentUserDecorator');

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User | null => {
    const req: Request = context.switchToHttp().getRequest();
    logger.debug(req.currentUser)
    return req.currentUser;
  }
);
