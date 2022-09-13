import { PageOptionsDto }     from './page-options.dto';
import { ApiExposedProperty } from '../decorators/api-exposed-property.decorator';

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export default class PageMetaDto {
  @ApiExposedProperty()
  readonly page: number;

  @ApiExposedProperty()
  readonly take: number;

  @ApiExposedProperty()
  readonly itemCount: number;

  @ApiExposedProperty()
  readonly pageCount: number;

  @ApiExposedProperty()
  readonly hasPreviousPage: boolean;

  @ApiExposedProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
