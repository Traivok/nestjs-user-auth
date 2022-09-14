import { Express as AuthExpress } from '../auth/interfaces/request.interface';
import { User }                   from '../entities/user.entity';

export namespace Express {
  export interface Request extends AuthExpress.Request {
    /**
     * @description current user0old
     */
    currentUser?: User;
  }
}
