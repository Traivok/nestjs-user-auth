import { Catch, HttpStatus }      from '@nestjs/common';
import { EntityNotFoundError }    from 'typeorm';
import { EntityBaseFilterFilter } from './entity-base-filter.filter';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter extends EntityBaseFilterFilter<EntityNotFoundError> {
  readonly httpCode = HttpStatus.NOT_FOUND;

  get message(): string {
    return this.entityName + ' not found';
  }

  constructor(protected entityName: string = 'Entity') {
    super(entityName);
  }
}
