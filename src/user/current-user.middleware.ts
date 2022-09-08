import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response }          from 'express';
import { User }                       from './entities/user.entity';
import { UserService }                from './user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: () => void) {
    const { userId = null } = req?.session ?? {};

    if (userId !== null) {
      req.currentUser = await this.userService.findOne(userId) ?? undefined;
    }

    next();
  }
}
