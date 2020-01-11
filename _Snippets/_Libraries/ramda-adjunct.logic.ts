import { argsPass, defaultWhen, dropArgs, isArray, isBoolean, isNotEmpty, isNull, isString, nand, neither, nonePass, notBoth } from 'ramda-adjunct'
import R, { equals, gt, lt, range } from 'ramda'

argsPass(
  R.all,
  [isArray, isBoolean, isString])
([], false, 'abc') //=> true
argsPass(
  R.none,
  [isArray, isBoolean, isString])
({}, 1, false) //=> true
argsPass(
  R.any,
  [isArray, isBoolean, isString])
({}, 1, 'abc') //=> true


defaultWhen(isNull, 1, null); // => 1
defaultWhen(isNull, 1, 2); // => 2
defaultWhen(equals(10), 5)

console.log(range(0, 10)
  .map(defaultWhen(gt(5), 1)))

const fn = (a = 1, b = 2) => a + b;

/**
 * Accepts a function with any arity and returns a function with arity of zero. The returned function ignores any arguments supplied to it.
 */
dropArgs(fn)('ignore1', 'ignore2'); //=> 3
fn() // same

isNotEmpty([1, 2, 3]); //=> true
isNotEmpty([]); //=> false
isNotEmpty(''); //=> false
isNotEmpty(null); //=> true
isNotEmpty(undefined) //=> true
isNotEmpty({}); //=> false
isNotEmpty({ length: 0 }); //=> true

// Returns false if both arguments are truthy; true otherwise.
nand(true, true); //=> false

// true if neither predicate returns true
console.log(neither(isNull, lt(10))(9))
console.log(nonePass([isNull, lt( 10)])(9))

console.log(notBoth(isNull, gt(10))(9))
