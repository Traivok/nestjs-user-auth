import { UseFilters }            from '@nestjs/common';
import { EntityDuplicateFilter } from './entity-duplicate.filter';
import { EntityNotFoundFilter }  from './entity-not-found.filter';

export function CatchEntityErrorsHandler(entityName?: string) {
  return UseFilters(new EntityDuplicateFilter(entityName), new EntityNotFoundFilter(entityName));
}

