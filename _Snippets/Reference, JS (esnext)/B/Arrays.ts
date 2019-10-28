import { Number, Record, Static, String, Array as RTArray } from 'runtypes'

export {}

/** helpers */
const range = (from: number, to: number) => ({
  length: (to - from) > 0 ? (to - from) : 0,

  [Symbol.iterator]: () => {
    return {
      current: from,
      last: to,

      next() {
        return this.current <= this.last
               ? { done: false, value: this.current++ }
               : { done: true }
      },
    }
  },
})
// test
const isEven = (num: number) => !(num % 2)
console.log(isEven(10))
const NUMS: number[] = Array.from(Array(10).keys())
const STRS: string[] = ['one', 'two', 'three', 'one']
const ANY: unknown[] = [() => 0, {}, Symbol('hi')]

/** methods */
console.log(STRS[2])
console.log('two' in STRS)
console.log(STRS.length)
// can truncate:
NUMS.length = 8
console.log(NUMS)
console.log(STRS.concat('test'))
const str = STRS.join('-')
console.log(str.split('-'))
console.log(STRS.push('five')) // to the end, return new len
console.log(STRS.pop()) // from the end
// next 2 are much slower!
console.log(STRS.shift()) // from the front
console.log(STRS.unshift('one')) // adds to the front, returns new len
console.log(STRS.reverse())
console.log(NUMS.every(isEven))
console.log(NUMS.some(isEven))
console.log(NUMS.find(value => value > 3))
console.log(STRS.find/*some*/((c: string) => /th/g.test(c))) // used to work without () =>
console.log(STRS.findIndex((value) => value.length > 3)) // it's reversed..
console.log(STRS.indexOf('one')) // -1 if nothing found
console.log(STRS.lastIndexOf('one'))
console.log(STRS.includes('one'))
console.log(NUMS.filter(value => value > 5))
console.log(NUMS.splice(1, 2, 0, 0, 0)) // mutates and returns deleted
console.log(NUMS) // inserted elements
console.log(NUMS.slice(-3, -1)) // piece of arrray, does not mutate
console.log(NUMS.concat([2, 3, 4]))
console.log([...NUMS, 2, 3, '3']) // alternative, does not inherit the type

console.log(['one', ['two', ['three', ['four', ['five']]]]]
  .flat(Infinity))
console.log(['This is', 'pretty awesome', '!']
  .flatMap((segment) => segment.match(/\w+|!/g)))


/**
 * functional;
 * may provide optional 'this' argument
 */
console.log(NUMS.reduce((acc, curr) =>
  acc + curr, 0)) // sum, starting value
console.log(NUMS.reduceRight((acc, curr) =>
  acc + curr, 0)) // same, but from the right
console.log(NUMS.map(value => value + 1))
/** as long as map / reduce function conforms to parameters, you can pass it
 * without param => foo(param) */
const double = (value: number, index: number) => ({ [index]: value * 2 })
console.log([1, 3, 4, 5].map(double))
console.log(NUMS.sort((a, b) => a - b)) // provide comparator

/** iteration */
for (let str1 of STRS)
  console.log(str1)
STRS.forEach(console.log)

/** advanced reduce examples */
export const sum = (numbers: number[]): number =>
  numbers.reduce((prev, current) => prev + current)
/** [0, 1, 2, ..., n] */
const rangeSpreadArray = (length: number): number[] =>
  [...Array(length).keys()]
console.log(rangeSpreadArray(10))

export const Name = String.withConstraint(x => (
  /^[A-Z][a-z]+$/.test(x)
  && (x.length > 1 && x.length < 21))
  || `${x} doesn't match required format: "Abcd", 2-20 chars`)

const Student = Record({
  grade: Number.withConstraint(x =>
    (x >= 0 && x <= 15)
    || `${x} doesn't satisfy constraint: 0 >= x <= 15`),

  name: Name,
})

type Student = Static<typeof Student>

const students: Student[] =
  RTArray(Student).check([
    { name: 'Nick', grade: 10 },
    { name: 'John', grade: 15 },
    { name: 'Julia', grade: 15 },
    { name: 'Nathalie', grade: 9 },
    { name: 'Test', grade: 0 },
  ])

console.log(students
  .map(student => student.grade)
  .filter(grade => grade >= 10)
  .reduce((acc, curr) => acc + curr, 0))

export const objectify = (target: Student[]) =>
  target.reduce((previousValue, currentValue) => ({
    ...previousValue, // spread existing data
    [currentValue.name]: currentValue.grade, // overwrite / add new data on top
  }), {}) // intialize with empty object, optional (may need to provide appropriate types with <>)

console.log(objectify(students))

console.log(
  STRS.reduce((acc, curr, index) => ({
    ...acc,
    [`[${index}] ` + curr]: curr.length,
  }), {}),
)

/**
 * TS doesn't like this
 */
// let arr = [1, 2];
//
// let arrayLike = {
//   0: "something",
//   1: "else",
//   [Symbol.isConcatSpreadable]: true,
//   length: 2
// };
//
// console.log( arr.concat(arrayLike) ); // 1,2,something,else

/**
 * array like, but not iterable
 */
let arrayLike = {
  0: 'Hello',
  1: 'World',
  2: 'prop',
  length: 5, // needs this
}

console.log(Array.from(arrayLike))
console.log(Array.from(range(-3, 4)))
// optional map function
// console.log(Array.from(range(-3, 5),
//   (num) => num !== undefined
//            ? num * 2
//            : undefined))
