import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError }          from 'typeorm';
import { EntityBaseFilterFilter }    from './entity-base-filter.filter';

@Catch(QueryFailedError)
export class EntityDuplicateFilter extends EntityBaseFilterFilter<QueryFailedError> {
  protected readonly logger = new Logger(EntityDuplicateFilter.name);
  readonly httpCode = HttpStatus.CONFLICT;

  get message(): string {
    return this.entityName + ' already exists';
  }

  constructor(entityName: string = 'Entity') {
    super(entityName);
  }

  override checkException(e: QueryFailedError): boolean {
    return Number(e.driverError.code) === 23505;
  }
}
