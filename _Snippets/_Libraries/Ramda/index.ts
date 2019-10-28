import * as RA from 'ramda-adjunct'
import * as R from 'ramda'
import _ from 'lodash'

type User = {
  occupation: string;
  traits?: string[];
  name: string;
  age?: number;
  nested?: {
    nested2?: {
      nested3?: string
    }
  }
}

const user = {
  name: 'Sam',
  age: 25,
  occupation: 'Unemployed',
  traits: ['Shy'],
}

const users: User[] = [
  {
    name: 'Roman',
    age: 25,
    occupation: 'Unemployed',
    traits: ['Shy', 'Amiable'],
  },
  {
    name: 'Ivan',
    age: 24,
    occupation: 'Developer',
    traits: ['Likes to sleep'],
  },
  user,
]

const array = [1, 2, 3]
const array2 = [1, 1, 1]


console.log(RA.isArray(array))

console.log(RA.allEqual(array))
console.log(RA.allEqual(array2))
console.log(RA.allEqualTo(1, array2))

console.log(RA.allEqualTo({}, [{}, {}]))
console.log(RA.allIdenticalTo({}, [{}, {}]))

console.log(R.equals(1, 1))
const [a, b] = [1, 1]
const c = 3
const d = 3
// by the looks of it, compiler optimizes and assigns different variables to the same object
console.log(R.equals(a, b))
console.log(R.identical(a, b))
console.log(R.identical(c, d))


const getRange = R.juxt([Math.min, Math.max])
console.log(getRange(3, 4, 9, -3))

console.log(RA.list(1, 2, 3))
// right-to-left
console.log(R.compose(Math.abs, R.add(1), R.multiply(2))(-10))
// left-to-right
console.log(R.pipe(Math.abs, R.add(1), R.multiply(2))(-10))

// either call with an argument, or provide within the definition
console.log(R.clamp(-10, 20)(25))
console.log(R.clamp(-10, 12, 15))
console.log(_(10).clamp(0, 12))


//--------------------------------------

// returns first non-nil value
const stubNil = () => null
const stubUndefined = () => undefined
const addOne = (v: number) => v + 1
const addTwo = (v: number) => v + 2

// returns first non-nill return value
console.log(RA.dispatch([stubNil, stubUndefined, addOne, addTwo])(10))

// acts as a switch
// arrow function here serves only to provide TS typings
const fnSwitch = (arg: string | number | any[] | Date) => RA.dispatch([
  R.ifElse(RA.isString, s => `${s}-join`, RA.stubUndefined),
  R.ifElse(RA.isNumber, n => n + 1, RA.stubUndefined),
  R.ifElse(RA.isArray, a => `Array: ${[...a]}`, RA.stubUndefined),
  R.ifElse(RA.isDate, R.T, R.identity),
])(arg)
console.log(fnSwitch(1))
console.log(fnSwitch('Hi'))
console.log(fnSwitch(new Date()))
console.log(fnSwitch([1, 2, 3]))

//-----------------------------------------

interface Obj {
  a: string,
  b: string,
  x: number,
  y: number
}

const pred = (obj: Obj) => R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')), //flips boolean return of the function
  x: R.gt(R.__, 10),
  y: R.lt(R.__, 20),
})(obj)

console.log(pred({ a: 'foo', b: 'erer', x: 11, y: 19 }))

const appendToObjectKeys = (string: string, object: object) => RA.renameKeysWith(R.concat(string))(
  object)

console.log(appendToObjectKeys('_', { test: 10 }))

//-------------------

const getTraits = (user: User) =>
  RA.dispatch([
    R.ifElse(R.has('age'), () => user.age, () => new Error('no prop')),
  ])(user)

const user2: User = {
  age: 45,
  name: 'Ivan',
  occupation: '',
  nested: {
    nested2: {
      nested3: 'test',
    },
  },
}

console.log(
  getTraits(user))

console.log(R.pipe(Math.trunc, () => NaN)(10.2))

const getPropOrThrow = <T extends { [key: string]: any }, K extends keyof T>(object: T, prop: K) => {
  if (object[prop]) return object[prop]
  throw new Error(`${prop} is not found`)
}

const foo2 = (user: User) =>
  [
    user.nested ? user.nested : new Error('no nested'),
  ]

console.log(
  getPropOrThrow(user2, 'nested'),
)
