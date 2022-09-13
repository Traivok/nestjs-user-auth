import { ParseBoundedIntPipe } from './parse-bounded-int.pipe';

describe('Parse bounded int [PIPE]', () => {
  it('Should bound values', async () => {
    const minValue = 0;
    const maxValue = 100;
    const mid = (minValue + maxValue) / 2.;

    const pipe = new ParseBoundedIntPipe({ min: minValue, max: maxValue });
    expect(await pipe.transform(Math.floor(mid).toString(), { type: 'query' })).toEqual(mid);
    expect(await pipe.transform((minValue - 1).toString(), { type: 'query' })).toEqual(minValue);
    expect(await pipe.transform((maxValue + 1).toString(), { type: 'query' })).toEqual(maxValue);
  });

  it('Should handle default values', async () => {
    const defaultPipe = new ParseBoundedIntPipe();
    expect(await defaultPipe.transform('40', { type: 'query' })).toEqual(40);
    expect(await defaultPipe.transform('-200', { type: 'query' })).toEqual(-200);
    expect(await defaultPipe.transform('200', { type: 'query' })).toEqual(200);
  });
});