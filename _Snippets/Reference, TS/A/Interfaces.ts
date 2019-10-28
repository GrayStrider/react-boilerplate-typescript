interface x1 {
  optional?: string
  readonly readonly: boolean
  readonly arr: number[]
  nestedObj: {
    [index: string]: number
    /* type: string can't use, because not assignable to indexed type*/,
    type: number
    hardcoded: 10
  }
  method(): 'hi'
  // [anyOtherValue: string]: any;
}

let obj: x1 = {
  method: () => 'hi',
  nestedObj: {
    hardcoded: 10,
    type: 3,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
  },
  arr: [1],
  readonly: false,
  optional: 'optional',
  // another: false
}

function foo(...args: number[]): void {
  console.log(args)
}

foo(3, 4, 5)

namespace Clock {
  interface ClockConstructor {
    new(hour: number, minute: number): IClock; // constructor interface
  }

  interface IClock {
    tick(): void;
  }

  const createClock = (ctor: ClockConstructor, hour: number, minute: number): IClock =>
    new ctor(hour, minute)

  class DigitalClock implements IClock {
    constructor(h: number, m: number) {
    }

    tick() {
      console.log('beep beep')
    }
  }

  class AnalogClock implements IClock {
    constructor(h: number, m: number) {
    }

    tick() {
      console.log('tick tock')
    }
  }

  let digital = createClock(DigitalClock, 12, 17)
  let analog = createClock(AnalogClock, 7, 32)
  const Clock: ClockConstructor = class Clock implements IClock { // class expressions
    constructor(h: number, m: number) {
    }

    tick() {
      console.log('beep beep')
    }
  }
}

enum Colors {
  black = 1, blue = 2
}

interface Shape {
  color: Colors;
}

interface Square extends Shape {
  readonly sideLength: number;
}

let square: Square = { color: Colors.black, sideLength: 10 }
square.color = Colors.blue


// object that acts as both a function and an object


class Counter {
  private timeElapsed = 0
  private interval: number = 5

  constructor(startFrom: number) {

  }

  reset() {
    this.timeElapsed = 0
  }

  start(startFrom = 0) {
    // ...
  }
}

class Control {
  private state: any
}

interface SelectableControl extends Control { // interface extending class
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}


// interface ILabelledValue {
//     label: string;
// }
// function printLabel(labelledObj: ILabelledValue /* equivalent to { label: string } */) {
//     console.log(labelledObj.label);
// }
// let myObj = {size: 10, label: "Size 10 Object"};
// // printLabel(myObj); // won't let create label with non-string type

interface ISquareDefault {
  color?: string;
  width?: number;
}

interface ISquareWithArea extends ISquareDefault {
  area?: number;
}

const createSquareWithArea = (config: ISquareWithArea) => {
  // could use this piece here instead of extending interface
  const newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

class SquareDefault {
  public color = 'white'
  public width = 10

  constructor(config: ISquareDefault) {
    if (config.color) {
      this.color = config.color
    }
    if (config.width) {
      this.width = config.width
    }
  }

  // public getWidth() {
  //     return this.width;
  // }
}

class SquareWithArea extends SquareDefault {
  private readonly area: number

  constructor(config: ISquareWithArea) {
    super(config)
    if (config.area) {
      this.area = config.area
      this.width = config.area / 2
    }

    this.area = this.width * 2
  }

  public getArea() {
    return this.area
  }
}

const printProps = (object: { [key: string]: any }) => {
  // will display private class variables because of string literal usage in log.
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      console.log(`[${prop}]: ${object[prop]}`)
    }
  }
}

const mySquare = createSquareWithArea({ color: 'black' })
printProps(mySquare)
// // [color]: black
// // [area]: 100

const mySquare2 = createSquareWithArea({ width: 15 })
printProps(mySquare2)
// // [color]: white
// // [area]: 225 // square itself doesn't have 'width' property, but 'area'
// // property updates accordingly.

const mySquare3 = new SquareWithArea({ area: 500 })
console.log(mySquare3)
console.log(`area: ${mySquare3.getArea()}`)
printProps(mySquare3)

const mySquare4 = new SquareDefault({})
printProps(mySquare4)


printProps({}) // fails hasOwnProp check, doesn't print anything

type ISearchFunc = (source: string, subString: string) => boolean;
const mySearch: ISearchFunc = (src, sub) => {
  const result = src.search(sub)
  return result > -1
}
console.log(mySearch('test234test', '34')) // true
console.log(mySearch('test', '3')) // false

/**
 * Intersection
 */
namespace IntersectionA {
  interface A {
    propA: 'stringA' | 'stringB'
    propA1: string
  }

  interface B {
    propB: 50
  }

  type TaggedUnion = A & B

  const object: TaggedUnion = {
    propA: 'stringA',
    propB: 50,
    propA1: 'anystring',
  }
}

namespace IntersectionB {

  interface A {
    prop: string
  }

  interface B {
    prop: number
    prop2: boolean
  }

  interface C {
    prop: string
    prop2: boolean

  }

  const test: A | B | C = { prop: 40, prop2: false } // implement either interface
  const test2: A & C = { prop: 'false', prop2: false } // implement all interfaces
// const test3: B & C = { prop: 'false', prop2: false } // impossible type; string and number are incompatible
}

/**
 * Hey, TypeScript, I would like to be able to index into this
 * interface with a string, and I should get either a string or a
 * number back. Oh, and please don’t let me add any other thing to any
 * object that implements this interface that I didn’t explicitly
 * specify.
 *
 * PROBABLY NOT NEEDED, but interesting usage of readonly.
 */
interface ComponentState {
  nameError: string;
  ageError: string;
  numOfFields: number;
  readonly [x: string]: string | number;
}


