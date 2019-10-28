import _, { flow } from 'lodash'
import { map } from 'ramda'

const object = {
  x: 42,
  y: 50,
  abc: 9001,
  z: 'test',
  az: 50,
  falsy: false,
}


console.log(
  _.pickBy(object,
    (value, key) =>
      key.length === 1 && typeof value === 'number'),
  /**
   * same result with native methods
   */
  Object.fromEntries(
    Object.entries(object)
          .filter(([key, value]) =>
            key.length === 1 && typeof value === 'number'),
  ))

/**
 * lodash object
 */
console.log(
  _(object)
    .pickBy((value, key) =>
      value === 50 && key.length === 1)
    .value(),
)

/**
 * filter returns an array of values matching the predicate
 */
console.log(
  _(object)
    .filter((value) => typeof value === 'number')
    .map((value: number) => value * 2)
    .value(),
)

console.log(
  _.filter(object,
    (value) => !!value),
)

const doubleSay = (str: string) =>
  str + ', ' + str
const capitalize = (str: string) =>
  str[0].toUpperCase() + str.substring(1)
const exclaim = (str: string) =>
  str + '!'

// let res = 'hello'|> doubleSay|> capitalize|> exclaim|> console.log
flow([doubleSay, capitalize, exclaim, console.log])('hello')

console.log(flow([])('hello'))


const myFlow = (funcs: ((arg: any) => any)[]) =>
  funcs.length === 0
  ? (arg: any) => arg
  : (arg: any) => {
    const [first, ...rest] = funcs
    return rest.reduce((curr, acc) =>
      acc(curr), first(arg) as any)
  }

myFlow([doubleSay, capitalize, exclaim, console.log])('hello')
console.log(myFlow([doubleSay, capitalize, exclaim])('hello'))
console.log(myFlow([doubleSay])('hello'))
console.log(myFlow([])('hello'))
export { doubleSay, capitalize, exclaim, myFlow }


const coll = [...Array(10).keys()]
const mapper = (val: number) => val + '_'

// rambda vs lodash

flow([map(mapper), console.log])(coll)
flow([_.partialRight(_.map, mapper), console.log])(coll)
