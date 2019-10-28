export {}

type NonEmptyArray<T> = [T, ...T[]]; // "one T +  0 or more of T"

/** ! WORKS AT RUNTIME ! */
const isNonEmptyArray =
  <T>(arr: T[]):
    arr is NonEmptyArray<T> =>
    arr.length > 0

const arr: NonEmptyArray<string | number> =
  ['string', 0]
console.log(
  isNonEmptyArray(['', 1]),
  isNonEmptyArray([]),
  isNonEmptyArray(arr),
)

/**
 * Just some interfaces
 */
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}

/**
 * User Defined Type Guard!
 */
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined
}

/**
 * Sample usage of the User Defined Type Guard
 */
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo) // OK //narrowed to Foo
    // console.log(arg.bar); // Error!
  } else {
    // console.log(arg.foo); // Error!
    console.log(arg.bar) // OK
  }
}

doStuff({ foo: 123, common: '123' })
doStuff({ bar: 123, common: '123' })

namespace inOperator {
  interface A {
    x: number;
  }

  interface B {
    y: string;
  }

  const doStuff = (q: A | B) =>
    'x' in q
      // narrowed down!
    ? console.log(q)
    : console.log(q)


}
