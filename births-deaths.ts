import {expect} from 'chai';

//
// given a list of people (with birth and death year), determine the year
// with the most people alive.
//

type Year = string; // ex: '2017'

interface Person {
  birthyear: Year;
  deathyear: Year;
}

interface YearCounts {
  born: number;
  died: number;
}

const computeMostAliveYear = (people: Array<Person>): Year => {
  if (people.length === 0){
    throw new Error('cannot compute most alive year with no data');
  }

  const map: Map<Year, YearCounts> = new Map<Year, YearCounts>();

  people.forEach((person) => {
    const birthYear: Year = person.birthyear;
    const deathYear: Year = person.deathyear;

    if (!map.has(birthYear)) {
      map.set(birthYear, {born: 1, died: 0});
    } else {
      map.get(birthYear)!.born += 1;
    }
    if (!map.has(deathYear)) {
      map.set(deathYear, {born: 0, died: 1});
    } else {
      map.get(deathYear)!.died += 1;
    }
  });

  let highestLivingYear: Year | null = null;
  let highestLivingCount: number = -1;
  let rollingLivingCount = 0;

  Array.from(map.keys()).sort().forEach((year) => {
    const records = map.get(year);
    rollingLivingCount += records!.born;
    rollingLivingCount -= records!.died;

    if (highestLivingYear == null || rollingLivingCount > highestLivingCount) {
      highestLivingYear = year;
      highestLivingCount = rollingLivingCount;
    }
  });

  return highestLivingYear!;
};

describe('#computeMostAliveYear', () => {

  it('computes most alive short list', () => {
    const people: Array<Person> = [
      {birthyear: '1988', deathyear: '2011'},
      {birthyear: '1988', deathyear: '2017'},
      {birthyear: '1988', deathyear: '1989'},
    ];
    expect(computeMostAliveYear(people)).to.deep.equal('1988');
  });

  it('computes most alive short middle', () => {
    const people: Array<Person> = [
      {birthyear: '1988', deathyear: '1994'},
      {birthyear: '1992', deathyear: '1994'},
      {birthyear: '1993', deathyear: '2000'},
      {birthyear: '1995', deathyear: '2000'},

    ];
    expect(computeMostAliveYear(people)).to.deep.equal('1993');
  });
});
