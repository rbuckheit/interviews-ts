import {expect} from 'chai';

const helper = (list: Array<number>, target: number, low: number, high: number): number | null => {
  if (low > high) {
    return null;
  }

  const mid = Math.floor((high + low) / 2);

  if (list[mid] === target) {
    return mid;
  } else if (list[mid] < target) {
    return helper(list, target, mid + 1, high);
  } else {
    return helper(list, target, 0, mid - 1);
  }
};

const binarySearch = (list: Array<number>, target: number): number | null => {
  return helper(list, target, 0, list.length - 1);
};


describe('#binarySearch', () => {

  it('finds first in list', () => {
    expect(binarySearch([1, 2, 3], 1)).to.deep.equal(0);
  });
  it('finds last in list', () => {
    expect(binarySearch([1, 2, 3], 3)).to.deep.equal(2);
  });
  it('finds middle in list', () => {
    expect(binarySearch([1, 2, 3], 2)).to.deep.equal(1);
  });
  it('finds null if not in list', () => {
    expect(binarySearch([1, 2, 5], 9)).to.deep.equal(null);
  });
  it('finds with odd length list', () => {
    expect(binarySearch([1, 2, 3, 5, 9], 9)).to.deep.equal(4);
  });
  it('finds with even length list', () => {
    expect(binarySearch([1, 2, 3, 5], 3)).to.deep.equal(2);
  });

});
