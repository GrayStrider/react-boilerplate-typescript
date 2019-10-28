class Greeter3 {
  private readonly greeting: string // private member, readonly
  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter3('world')

// Inheritance
//================================================================================
// Animals
//================================================================================

abstract class Animal { // cannot be instantiated directly
  // initialize without a constructor!
  // cannot be accessed externaly
  protected owner: string = 'None'

  protected constructor(private readonly name: string) {}

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters.toPrecision(4)}m.`)
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name) }

  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name) }

  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }

  setOwner(newOwner: string) {this.owner = newOwner}
}

let sam = new Snake('Sammy the Python')

let tom: Animal = new Horse('Tommy the Palomino')
sam.move()
tom.move(34)

// In TypeScript, each member is public by default
namespace Chameleon {
  type color = 'green' | 'black'

  export class Chameleon {
    newColor: color

    constructor({ newColor = 'green' }: { newColor?: color } = {}) {
      this.newColor = newColor
    }

    colorChange(newColor: color) {
      this.newColor = newColor
      return this.newColor
    }
  }
}

import MyChameleon = Chameleon.Chameleon

const cham = new MyChameleon()
console.log(cham)
cham.colorChange('black')
console.log(cham)

//================================================================================
// Song duration
//================================================================================


class Song {
  constructor(
    public title: string,
    public duration: string | number,
  ) {}
}

function getSongDuration(item: Song) {
  if (typeof item.duration === 'string') {
    return item.duration
  }
  const { duration } = item
  const minutes = Math.floor(duration / 60000)
  const seconds = (duration / 1000) % 60
  return `${minutes}:${seconds}`
}

console.log(getSongDuration(
  new Song('Wonderful Wonderful', '05:31'),
))
console.log(getSongDuration(
  new Song('Wonderful Wonderful', 330000),
))

//================================================================================
// AbstractPropertiesAccessors
//================================================================================

namespace AbstractPropertiesAccessors {
  abstract class Base {
    abstract name: string

    abstract get value();
    abstract set value(v: number);
  }

  // ok
  class Derived extends Base {
    name = 'derived'
    value = 1
  }

  // have to be abstract
  abstract class DerivedAbstract extends Base {
    value = 20
  }

  const derived = new Derived()
  console.log(derived.value = 5)
  console.log(derived.value)
}

type Constructor<T> = new(...args: any[]) => T;

//================================================================================
// Mixins, Point
/**
 * The idea is simple, instead of a class A extending class B to get its functionality,
 * function B takes class A and returns a new class with this added functionality.
 * Function B is a mixin.
 * [A mixin is] a function that takes a constructor,
 * creates a class that extends that constructor with new functionality
 * returns the new class
 */
//================================================================================

namespace Mixins {


  class Point {
    constructor(public x: number, public y: number) {}
  }

  class Person {
    constructor(public name: string) {}
  }


  const Tagged = <T extends Constructor<{}>>(Base: T) =>
    class extends Base {
      _tag: string

      constructor(...args: any[]) {
        super(...args)
        this._tag = ''
      }
    }

  const TaggedPoint = Tagged(Point)

  let point = new TaggedPoint(10, 20)
  point._tag = 'hello'

  class Customer extends Tagged(Person) {
    accountBalance: number | undefined
  }

  let customer = new Customer('Joe')
  customer._tag = 'test'
  customer.accountBalance = 0

}

namespace Mixins2 {

  interface IPoint {
    x: number;
    y: number;
  }

  class Point implements IPoint {
    constructor(public x: number, public y: number) {}
  }

  const WithLocation = <T extends Constructor<IPoint>>(Base: T) =>
    class extends Base {
      private _location: [number, number] = [this.x, this.y]

      get location(): [number, number] {
        return this._location
      }
    }

  const point = new Point(10, 12)
  const pointWithLocation = WithLocation(Point)
  const point2 = new pointWithLocation(10, 12)
  console.log(point2.location)
}

//================================================================================
// DefinitiveAssignmentAssertion
//================================================================================

namespace DefinitiveAssignmentAssertion {
  class C {
    foo!: number
    // ^
    // Notice this '!' modifier.
    // This is the "definite assignment assertion"

    constructor() {
      this.initialize()
    }

    initialize() {
      this.foo = 0
    }
  }

  let x!: number
  initialize()

  // No error!
  console.log(x + x)

  // equal to x! + x!

  /**
   * will not work with function expression
   */
  function initialize() {
    x = 10
  }

  /**
   * non-null assertion
   */
  let y: number
  console.log(y! + 12) // no error!

  // OR:

  let z!: string
  console.log(z)
}
