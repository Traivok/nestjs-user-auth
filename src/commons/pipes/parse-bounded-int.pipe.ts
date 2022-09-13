import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class ParseBoundedIntPipe extends ParseIntPipe {
  protected minValue: number;
  protected maxValue: number;

  constructor(bound?: { min?: number, max?: number }) {
    super();

    const { min = -Infinity, max = Infinity } = bound ?? {};
    this.maxValue                             = max;
    this.minValue                             = min;
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parsedValue = await super.transform(value, metadata);
    return Math.max(Math.min(this.maxValue, parsedValue), this.minValue);
  }
}
