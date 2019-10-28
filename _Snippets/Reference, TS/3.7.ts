import { AssertionError } from 'assert'
import axios from 'axios'

export {}

//================================================================================
// Optional chaining
//================================================================================

interface Foo {
  bar?: {
    baz?: () => any
  }
}

const foo: Foo = {}
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}
// After-ish
if (foo?.bar?.baz) {
  // ...
}

//================================================================================
// Optional function call
//================================================================================

async function makeRequest(url: string, log?: (msg: string) => void) {
  log?.(`Request started at ${new Date().toISOString()}`)
  // equivalent to
  //   if (log !== null && log !== undefined) {
  //       log(`Request started at ${new Date().toISOString()}`);
  //   }

  const result = await axios.get(url)

  log?.(`Request finished at at ${new Date().toISOString()}`)

  return result.status
}

const logger = (msg: string) => console.log(msg)
const url = 'https://google.com'
makeRequest(url, logger).then(console.log)


//================================================================================
// Nullish coalescing
//================================================================================

const bar = (num?: number) =>
  num ?? 100
console.log(bar()) // 100
console.log(bar(0)) // 0, works correctly (|| would coerce to 'false')
console.log(bar(20)) // 20

const hasArgument = (arg: number) => arg ?? /*||*/ false
console.log(hasArgument(20))
console.log(hasArgument(0))


//================================================================================
// Assertion functions, runtime constraint validation
//================================================================================

// ofc possible to use any custom type as well; would be interesting to compare with runtypes.
function assertIsString(val: any): asserts val is string {
  if (typeof val !== 'string') {
    throw new AssertionError({ message: 'Not a string!' })
  }
}

function yell(str: any) {
  assertIsString(str)
  // Now TypeScript knows that 'str' is a 'string'.
  // return str.toPrecision(10)
  return str.toUpperCase()
}

console.log(yell('hello'))
// console.log(yell(10))

type ValidAge = number

function assertIsValidAge(age: number): asserts age is ValidAge {
  if ((age < 0) || (age > 99)) {
    throw new AssertionError({ actual: age, expected: '0 - 99', operator: '!=' })
  }
}

const checkAge = (age: number) => {
  assertIsValidAge(age)
  console.log('You may pass!')
}

checkAge(30)
// checkAge(101)


//================================================================================
// Recursive types
//================================================================================

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[];
