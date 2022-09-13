import { Injectable }          from '@nestjs/common';
import { ParseBoundedIntPipe } from './parse-bounded-int.pipe';

@Injectable()
export class ParseMaxIntPipe extends ParseBoundedIntPipe {
  constructor(protected max: number = Infinity) {
    super({ max });
  }
}
