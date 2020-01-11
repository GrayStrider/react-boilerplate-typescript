import RA from 'ramda-adjunct'
import { equals, identical } from 'ramda'

const [a, b] = [1, 1]

/**
 * Equality
 */
equals(a, b)
identical(a, b) // same memory location
RA.allEqual([ 1, 1, 1, 1 ]); //=> true
RA.allEqualTo(1, [ 1, 1, 1, 1 ]); //=> true
RA.allIdentical([ 1, 1, 1, 1 ]); //=> true
RA.allIdenticalTo(1, [ 1, 1, 1, 1 ]); //=> true
RA.allUnique([ 1, 2, 3, 4 ]); //=> true
RA.notAllUnique([ 1, 1, 2, 3 ]); //=> true


RA.appendFlipped(['write', 'more'], 'tests'); //=> ['write', 'more', 'tests']

RA.compact([0, 1, false, 2, '', 3]); //=> [1, 2, 3]

RA.concatAll([[1], [2], [3]]); //=> [1, 2, 3]
RA.concatAll(['1', '2', '3']); //=> '123'
RA.concatAll([]); //=> undefined;

RA.concatRight('ABC', 'DEF'); //=> 'DEFABC'
RA.concatRight([4, 5, 6], [1, 2, 3]); //=> [1, 2, 3, 4, 5, 6]

RA.contained([1, 2, 3], 3); //=> true
RA.ensureArray(42); //=> [42]
RA.ensureArray([42]); //=> [42]

RA.flattenDepth(
  2,
  [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10]
); //=> [1, 2, 3, 4, 5, 6, [[7], 8], 9, 10];

RA.lengthEq(3, [1,2,3]); //=> true
RA.lengthGt(3, [1,2,3,4]); //=> true
RA.lengthLte(3, [1,2]); //=> true
RA.lengthLte(3, [1,2,3]); //=> true
RA.lengthNotEq(3, [1,2,3,4]); //=> true
RA.list('a', 'b', 'c'); //=> ['a', 'b', 'c']

const initialList = ['f', 'o', 'o', 'b', 'a', 'r'];
const list = ['a', 'b', 'c', 'd', 'e'];

RA.reduceIndexed((acc, val, idx, list) =>
  acc + '-' + val + idx, '', initialList);
//=> "-f0-o1-o2-b3-a4-r5"
RA.mapIndexed((val, idx, list) =>
  idx + '-' + val, initialList);
//=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']

RA.move(1, 3, list) //=> ['a', 'c', 'd', 'b', 'e']

RA.omitIndexes([-1, 1, 3], ['a', 'b', 'c', 'd']); //=> ['a', 'c']
RA.pickIndexes([0, 2], ['a', 'b', 'c']); //=> ['a', 'c']

const obj = {
  a: { b: { c: 1 } },
  x: 2,
};

RA.paths([['a', 'b', 'c'], ['x']], obj); //=> [1, 2]

RA.repeatStr('a', 3); //=> 'aaa'

RA.sliceFrom(1, [1, 2, 3]); //=> [2, 3]
RA.sliceTo(2, [1, 2, 3]); //=> [1, 2]

RA.toArray([1, 2]); //=> [1, 2]
RA.toArray({'foo': 1, 'bar': 2}); //=> [1, 2]
RA.toArray('abc'); //=> ['a', 'b', 'c']
RA.toArray(1); //=> []
RA.toArray(null); //=> []
