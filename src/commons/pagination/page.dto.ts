import PageMetaDto            from './page-meta.dto';
import { ApiExposedProperty } from '../decorators/api-exposed-property.decorator';

export class PageDto<T> {
  @ApiExposedProperty({ apiOptions: { isArray: true } })
  readonly data: T[];

  @ApiExposedProperty({ apiOptions: { type: () => PageMetaDto } })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
