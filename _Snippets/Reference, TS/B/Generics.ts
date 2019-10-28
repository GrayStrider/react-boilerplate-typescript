class Queue<T> {
  private data = [] as any

  push(item: T) { this.data.push(item) }

  pop(): T | undefined { return this.data.shift() }
}

const queue = new Queue<number>()
queue.push(0)

// queue.push("1"); // ERROR : cannot push a string. Only numbers allowed

interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity


class GenericNumber<T> {
  zeroValue!: T
  add!: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y }


let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = 'null_'
stringNumeric.add = function(x, y) { return x + y }

console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))


interface Lengthwise {
  length: number;
}

const loggingIdentity = <T extends Lengthwise>(arg: T): T => {
  console.log(arg.length)  // Now we know it has a .length property, so no more error
  return arg
}


const getProperty = <T, K extends keyof T>(obj: T, key: K) =>
  obj[key]

let x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.


function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

function prop2<T>(obj: T, key: keyof T) {
  return obj[key]
}

let o = {
  p1: 0,
  p2: '',
  p3: [],
}

let v = prop(o, 'p1') // is number, K is of type 'p1'
let v2 = prop2(o, 'p1') // is number | string | any[], no extra info is captured
console.log(v)
console.log(v2)


function reverse<T>(items: T[]): T[] {
  const toreturn: T[] = [] // god
  for (let i = items.length - 1; i >= 0; i--) {
    toreturn.push(items[i])
  }
  return toreturn
}

const sample = [1, 2, 3]
let reversed = reverse(sample)
console.log(reversed) // 3,2,1

// Safety!
// reversed[0] = '1';     // Error!
// reversed = ['1', '2']; // Error!

reversed[0] = 1       // Okay
reversed = [1, 2]     // Okay

class Car {

  static instances = 0
  label: string = 'Generic Car'
  numWheels: Number = 4

  constructor() {Car.instances++}

  static horn() {
    return 'beep beep!'
  }
}

class Truck extends Car {
  label = 'Truck'
  numWheels = 18
}

class Vespa extends Car {
  label = 'Vespa'
  numWheels = 2
}


const washCar = <T extends Car>(car: T): T => {
  console.log(`Received a ${car.label} in the car wash.`)
  console.log(`Cleaning all ${car.numWheels} tires.`)
  console.log('Beeping horn -', Car.horn())
  console.log('Returning your car now')
  return car
}

const myVespa = new Vespa()
const myTruck = new Truck()
const car = new Car()
console.log(Car.instances) // static prop demo

washCar(myVespa)
washCar(myTruck)
washCar(car)


namespace TuplePair {
  interface Tuple<A, B> {
    a: A;
    b: B;
  }

  type Pair<T> = Tuple<T, T>

  const pair: Pair<number> = { a: 10, b: 30 }
}

namespace Constraints {

  function assign<T extends U, U extends any>(target: T, source: U): T {
    for (let id in source) {
      if (source.hasOwnProperty(id)) {
        target[id] = source[id]
      }
    }
    return target
  }

  let x = { a: 1, b: 2, c: 3, d: 4 }
  assign(x,
    { b: 10, d: 20 },
  )
  // assign(x, { e: 0 })  // Error
}

namespace MapGeneric {

  const arrayMap = <Elem, Mapped>(func: (elem: Elem) => Mapped):
    (arr: Elem[]) => Mapped[] =>
    arr => arr.map(func)

  const lengths: (a: string[]) => number[] =
    arrayMap(s => s.length)

  console.log(
    lengths(['123', '343', 'test']))

  console.log(
    arrayMap((elem: number) => elem * 2)
    ([1, 2, 3]))

  interface Mappable<T> {
    map<U>(f: (x: T) => U): Mappable<U>;
  }

  declare let a: Mappable<number>
  declare let b: Mappable<string | number>

  const mappable: Mappable<string> = ['test', 'another']
  console.log(mappable)

}

namespace TypeInstantiation {
  class Foo<T> {
    foo!: T
  }

  let FooNumber = Foo as { new(): Foo<number> } // ref 1

}
