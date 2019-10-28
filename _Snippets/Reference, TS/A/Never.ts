const error = (message: string): never => { // never
  throw new Error(message)  // Function returning never must have unreachable end point
}

const fail = () =>  // Inferred return type is never
  error('Something failed')

const move1 = (direction: 'up' | 'down') => {
  switch (direction) {
    case 'up':
      return 1
    case 'down':
      return -1
  }
  return error('Should never get here')
}

const move2 = (direction: 'up' | 'down'): number =>
  direction === 'up' ? 1 :
  direction === 'down' ? -1 :
  error('Should never get here')


// Inferred return type is T
/**
 * returns and calls error? Interesting
 * @param x
 */
const check = <T>(x: T | undefined) =>
  x || error('Undefined value')
const y = undefined
console.log(check(10))

namespace NeverThrow {
  /**
   * Confusion with void
   As soon as someone tells you that never is returned when a function never exits gracefully you
   intuitively want to think of it as the same as void. However, void is a Unit. never is a falsum.
   A function that returns nothing returns a Unit void. However, a function that never returns
   (or always throws) returns never. void is something that can be assigned (without strictNullChecking)
   but never can never be assigned to anything other than never.
   */


  function foo(x: string | number): boolean {
    if (typeof x === 'string') {
      return true
    } else if (typeof x === 'number') {
      return false
    }

    // Without a never type we would error :
    // - Not all code paths return a value (strict null checks)
    // - Or Unreachable code detected
    // But because TypeScript understands that `fail` function returns `never`
    // It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
    throw 'unreachable'
  }

}

export {}
