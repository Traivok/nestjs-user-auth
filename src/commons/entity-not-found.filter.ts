import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, UseFilters } from '@nestjs/common';
import { EntityNotFoundError }                           from 'typeorm';
import { Request, Response }                                             from 'express';

export function CatchEntityNotFound(entityName?: string) {
  return UseFilters(new EntityNotFoundFilter(entityName ?
                                             entityName + ' not found' :
                                             'Resource not found'));
}

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter<T> implements ExceptionFilter {
  constructor(private message: string) {}
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getResponse<Request>();
    const status = HttpStatus.NOT_FOUND;

    res.status(status)
      .json({
        statusCode: status,
        message: this.message,
        error: 'Not Found',
      });
  }
}
