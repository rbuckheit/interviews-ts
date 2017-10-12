import {expect} from 'chai';

// write a function to determine if a string has all unique characters.

const hasUniqueChars = (input: string) => {
  const map: any = {};
  for (const c of input) {
    if (map[c] != null) {
      return false;
    } else {
      map[c] = true;
    }
  }
  return true;
};

describe('#hasUniqueChars', () => {
  it('should return true if all unique', () => {
    expect(hasUniqueChars('ryan')).to.deep.equal(true);
  });
  it('should return false if not unique', () => {
    expect(hasUniqueChars('aa')).to.deep.equal(false);
  });
  it('should return true if empty', () => {
    expect(hasUniqueChars('')).to.deep.equal(true);
  });
});

// write a function to determine if one string is a permutation of another.
const isPermutation = (s1: string, s2: string) => {
  const sorted1 = Array.from(s1).sort().join();
  const sorted2 = Array.from(s2).sort().join();
  return sorted1 === sorted2;
};

describe('#isPermutation', () => {
  it('should return true if permutation', () => {
    expect(isPermutation('ryan', 'nayr')).to.deep.equal(true);
  });
  it('should return false if not permutation', () => {
    expect(isPermutation('aa', 'ab')).to.deep.equal(false);
  });
  it('should return false if empty', () => {
    expect(isPermutation('ryan', '')).to.deep.equal(false);
  });
});

// write a function to determine if two strings are 'one edit' away, i.e.:
// one insertion, removal, or substitition can get you from one string to another.

const oneAway = (s1: string, s2: string) => {
  if (s1.length > s2.length) {
    return isOneAwayByRemoval(s1, s2);
  } else if (s2.length > s1.length) {
    return isOneAwayByRemoval(s2, s1);
  } else {
    const s1Chars = Array.from(s1);
    const s2Chars = Array.from(s2);
    let $differentChars = 0;
    let $idx = 0;
    while ($idx < s1.length && $differentChars <= 1) {
      if (s1Chars[$idx] !== s2Chars[$idx]) {
        $differentChars += 1;
      }
      $idx += 1;
    }
    return ($differentChars <= 1);
  }
};

const isOneAwayByRemoval = (s1: string, s2: string) => {
  const s1Chars = Array.from(s1);
  const s2Chars = Array.from(s2);

  let $s1Idx = 0;
  let $s2Idx = 0;
  let $differentChars = 0;
  while ($differentChars <= 1 && $s1Idx < s1.length) {
    const $s1Char = s1[$s1Idx];
    const $s2Char = s2[$s2Idx];

    if ($s2Idx >= s2.length || $s1Char !== $s2Char) {
      $differentChars += 1;
      $s1Idx += 1;
    } else {
      $s1Idx += 1;
      $s2Idx += 1;
    }
  }
  return ($differentChars === 1);
};

const withinEditDistance = (s1: Array<string>, s2: Array<string>, editsLeft: number): boolean => {
  if (editsLeft < 0) {
    return false;
  } else if (s1.length === 0 &&  s2.length === 0) {
    return true;
  } else if (s1[0] === s2[0]) {
    return withinEditDistance(s1.slice(1), s2.slice(1), editsLeft);
  } else {
    return withinEditDistance(s1.slice(1), s2, editsLeft - 1) ||
      withinEditDistance(s1, s2.slice(1), editsLeft - 1) ||
      withinEditDistance(s1.slice(1), s2.slice(1), editsLeft - 1);
  }
};

const oneAwayRecursive = (s1: string, s2: string) => {
  return withinEditDistance(Array.from(s1), Array.from(s2), 1);
};

const oneAwayAlgos = [
  {name: 'oneAway', function: oneAway},
  {name: 'oneAwayRecursive', function: oneAwayRecursive},
];

oneAwayAlgos.forEach((algo) => {
  describe('#' + algo.name, () => {
    it('should return true if one away by removal', () => {
      expect(algo.function('ryan', 'ran')).to.deep.equal(true);
    });
    it('should return true if two away by removal', () => {
      expect(algo.function('ryan', 'ra')).to.deep.equal(false);
    });

    it('should return true if one away by addition', () => {
      expect(algo.function('ran', 'ryan')).to.deep.equal(true);
    });
    it('should return true if two away by addition', () => {
      expect(algo.function('ra', 'ryan')).to.deep.equal(false);
    });

    it('should return true if one away by substitution', () => {
      expect(algo.function('ryan', 'rfan')).to.deep.equal(true);
    });
    it('should return true if two away by substitution', () => {
      expect(algo.function('ryan', 'rybx')).to.deep.equal(false);
    });
  });
});

