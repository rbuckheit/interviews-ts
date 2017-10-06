//
// given array of numbers and a target, remove all instances of a number
// and return the new array.
//

import {expect} from 'chai';

const remove = (numbers: Array<number>, target: number) => {
  let $head = 0;
  let $tail = numbers.length - 1;

  while ($head < $tail) {
    while (numbers[$head] !== target && $head < numbers.length) {
      $head += 1;
    }
    while (numbers[$tail] === target && $tail > $head) {
      $tail -= 1;
    }
    if ($head < $tail) {
      const n = numbers[$head];
      numbers[$head] = numbers[$tail];
      numbers[$tail] = n;
    }
  }

  return numbers.slice(0, $tail);
};

describe('#remove', () => {

  it('should remove fives', () => {
    expect(remove([1, 5, 3, 5, 6, 5], 5).sort()).to.deep.equal([1, 3, 6]);
  });

  it('should remove repeats in middle', () => {
    expect(remove([1, 3, 3, 3, 1, 1], 3).sort()).to.deep.equal([1, 1, 1]);
  });

  it('should remove head and tail', () => {
    expect(remove([3, 1, 1, 1, 1, 3], 3).sort()).to.deep.equal([1, 1, 1, 1]);
  });
});
