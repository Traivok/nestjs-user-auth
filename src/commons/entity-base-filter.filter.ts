import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response }                                   from 'express';

export abstract class EntityBaseFilterFilter<T> implements ExceptionFilter {
  abstract readonly httpCode: HttpStatus;
  abstract get message(): string;

  protected constructor(protected entityName: string) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx    = host.switchToHttp();
    const res    = ctx.getResponse<Response>();
    const status = this.httpCode;

    res.status(status)
      .json({
        statusCode: status,
        message:    this.message,
      });
  }
}
