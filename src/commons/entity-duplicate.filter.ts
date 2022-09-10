import { Catch, HttpStatus }      from '@nestjs/common';
import { QueryFailedError }       from 'typeorm';
import { EntityBaseFilterFilter } from './entity-base-filter.filter';

@Catch(QueryFailedError)
export class EntityDuplicateFilter extends EntityBaseFilterFilter<QueryFailedError> {
  readonly httpCode = HttpStatus.CONFLICT;

  get message(): string {
    return this.entityName + ' already exists';
  }

  constructor(entityName: string = 'Entity') {
    super(entityName);
  }
}
