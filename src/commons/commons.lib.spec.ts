import { isNil } from '@nestjs/common/utils/shared.utils';

describe('Commons Library', () => {
  it('Should identify nil values', () => {
    const toTest = [
      { value: undefined, result: true },
      { value: null, result: true },
      { value: false, result: false },
      { value: 0, result: false },
      { value: [], result: false },
      { value: {}, result: false },
      { value: '', result: false },
    ];

    toTest.forEach(({ value, result }) => {
      expect(isNil(value)).toEqual(result);
    });
  });

  it('Should identify empty types', () => {
    const toTest = [
      { value: undefined, result: true },
      { value: null, result: true },
      { value: false, result: false },
      { value: 0, result: false },
      { value: [], result: false },
      { value: {}, result: false },
      { value: '', result: false },
    ];
  });

});