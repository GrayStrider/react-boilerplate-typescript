import { noop, allP, seq, lastP, isAsyncFunction, delayP, rejectP, resolveP, isFunction, async, thenP } from 'ramda-adjunct'
import R from 'ramda';


allP([1, 2])
  .then(console.log); //=> Promise([1, 2])
allP([1, Promise.reject(2)]); //=> Promise(2)
allP([Promise.resolve(1), Promise.resolve(2)]); //=> Promise([1, 2])

// async from generator
const asyncFn = async(function* generator(val1, val2) {
  const a = yield Promise.resolve(val1);
  const b = yield Promise.resolve(val2);

  return a + b;
});

asyncFn(1, 2); //=> Promise(3)

delayP({ timeout: 1000, value: 'hello world' });
//=> Promise('hello world')

isAsyncFunction(async function test() { }); //=> true
isFunction(function test() { }); //=> true

/**
 * fulfilled by the last given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected
 */
lastP([
  1,
  delayP(10),
  delayP(100),
  delayP.reject(1000),
]); //=> Promise(100)

noop(1, 2, 3); //=> undefined

rejectP('a'); //=> Promise('a')
resolveP('a'); //=> Promise('a')

seq([console.info, console.log])('foo'); //=> prints 'foo' via info then log

// usage in composition
R.pipe(
  R.concat('prefix '),
  // same as pipe, but returns the initial value
  seq([
    console.info, //=> prints 'prefix test'
    console.log //=> prints 'prefix test'
  ]),
  R.toUpper
)('test'); //=> 'PREFIX TEST'

const log = thenP(console.log)

const foo = async (num: number) =>
	num

log(foo(10)) // Promise.then...
