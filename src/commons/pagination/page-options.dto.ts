import { Exclude, Type }                       from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional }                 from '@nestjs/swagger';
import { Logger }                              from '@nestjs/common';

export enum Order {
  ASC  = 'ASC',
  DESC = 'DESC'
}

export class PageOptionsDto {
  @Exclude()
  private readonly logger = new Logger('PageOptionsDto');

  constructor(order = Order.ASC, page = 1, take = 10) {
    this.order = order;
    this.page = page;
    this.take = take;
  }

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
    type:    Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 10,
    maximum: 100,
    default: 10,
    type:    Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return ( this.page - 1 ) * this.take ;
  }
}

