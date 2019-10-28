export default {}

let name = 'John'

function sayHi() {
  console.log('Hi, ' + name)
}

name = 'Pete'
sayHi()


const makeWorker = () => {
  let name = 'Pete'
  return function() { return console.log('makeWorker:', name) }
}

name = 'John'
// create a function
let work = makeWorker()
// call it
work() // what will it show? _"Pete"_ (name where created) or "John" (name where called)?

/**
 * sum with closure
 */
const sum = (a: number) =>
  (b: number) =>
    a + b
console.log(sum(1))
console.log(sum(1)(3))

/**
 * inBetween returns x => x >= from && x <= to
 * directly into filter
 */
let arr = [1, 2, 3, 4, 5, 6, 7]

const inBetween = (from: number, to: number) =>
  (value: number): boolean =>
    value >= from && value <= to

const inArray = (array: number[]) =>
  (value: number): boolean =>
    array.includes(value)

console.log(
  arr.filter(
    inBetween(3, 6),
  ))

console.log(
  arr.filter(
    inArray([1, 2, 10]),
  ))

let users = [
  { name: 'John', age: 20, surname: 'Johnson' },
  { name: 'Pete', age: 18, surname: 'Peterson' },
  { name: 'Ann', age: 19, surname: 'Hathaway' },
]

/**
 * generic types example
 * @param array
 * @param field
 */
const byField = <Obj extends Object, Key extends keyof Obj>
(array: Obj[], field: Key) =>
  (a: Obj, b: Obj) =>
    a[field] > b[field] ? 1 : -1

console.log(
  users.sort(byField(users, 'name')))

console.log(
  users.sort(byField(users, 'surname')))
