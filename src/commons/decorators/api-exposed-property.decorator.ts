import { applyDecorators }                 from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, ExposeOptions }           from 'class-transformer';

export interface ApiExposedPropertyOptions {
  apiOptions?: ApiPropertyOptions,
  exposeOptions?: ExposeOptions,
}

export const ApiExposedProperty = (options?: ApiExposedPropertyOptions) =>
  applyDecorators(ApiProperty(options?.apiOptions), Expose(options?.exposeOptions));
