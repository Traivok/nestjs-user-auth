import { Injectable }          from '@nestjs/common';
import { ParseBoundedIntPipe } from './parse-bounded-int.pipe';

@Injectable()
export class ParseMinIntPipe extends ParseBoundedIntPipe {
  constructor(protected min: number = -Infinity) {
    super({ min });
  }
}
