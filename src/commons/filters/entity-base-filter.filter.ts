import { ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response }                                           from 'express';

export abstract class EntityBaseFilterFilter<T> implements ExceptionFilter {
  protected readonly logger = new Logger(EntityBaseFilterFilter.name);
  abstract readonly httpCode: HttpStatus;

  abstract get message(): string;

  checkException(e: T): boolean {
    return true;
  }

  protected constructor(protected entityName: string) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const status = this.httpCode;

    if (this.checkException(exception)) {
      res.status(status)
        .json({
          statusCode: status,
          message:    this.message,
        });
    } else {
      this.logger.error(exception);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:    'Internal Server Error',
        });
    }
  }
}
