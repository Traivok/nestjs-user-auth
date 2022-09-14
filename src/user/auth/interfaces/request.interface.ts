import { JwtPayload } from '../Jwt';

export namespace Express {
  export interface Request {
    /**
     * @description passport automatically set property
     */
    user?: JwtPayload;
  }
}