import { forEach, map, complement, find, append } from 'ramda'

const logger = forEach(console.log)
const appendString = map((value: number) => value + '_')
const arr = [1, 2, 3]
logger(arr)
console.log(appendString(arr))

//----

const isEven = (x: number) => x % 2 === 0
const isOdd = complement(isEven)

find(isOdd, [1, 2, 3, 4])

console.log(append('_')([]))
