import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request }              from 'express';
import { User as UserEntity }                 from './entities/user.entity';
import { UserService }                        from './user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser: UserEntity | null;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CurrentUserMiddleware.name);

  constructor(private userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const session: any = req.session ?? {};

    const userId = session.userId ?? null;

    if (userId !== null) {
      req.currentUser = await this.userService.findOne(userId) ?? null;
    } else {
      req.currentUser = null;
    }

    next();
  }
}
