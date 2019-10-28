// TODO fix types

namespace HOF {
  function logDuration<T extends (...args: any[]) => any>(func: T): (...funcArgs: Parameters<T>) => ReturnType<T> {
    const funcName = func.name

    // Return a new function that tracks how long the original took
    return (...args: Parameters<T>): ReturnType<T> => {
      console.time(funcName)
      const results = func(...args)
      console.timeEnd(funcName)
      return results
    }
  }

  function addNumbers(a: number, b: number): number {
    return a + b
  }

  const addNumbersWithLogging = logDuration(addNumbers)
  addNumbersWithLogging(5, 3)

}
//
// class Greeter2 {
//   greeting: string
//
//   constructor(name: string) {
//     this.greeting = name
//   }
//
//   @enumerable(true)
//   greet() {
//     return 'Hello, ' + this.greeting
//   }
// }
//
// function enumerable(value: boolean) {
//   return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//     descriptor.enumerable = value
//     console.log(target)
//     console.log(propertyKey)
//     console.log(descriptor)
//   }
// }
//
// const greet = new Greeter2('Ivan')
// console.log(greet.greet())
//
//
// function f() {
//   console.log('f(): evaluated')
//   return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log('f(): called')
//   }
// }
//
// function g() {
//   console.log('g(): evaluated')
//   return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
//     console.log('g(): called')
//   }
// }
//
// class C {
//   @f()
//   @g()
//   method() {}
// }
//
//
// //================================================================================
// //
// //================================================================================
//
// const Emoji = () => (target: Object, key: string | symbol) => {
//
//   let val = target[key]
//
//   const getter = () => {
//     return val
//   }
//   const setter = (next: any) => {
//     console.log('updating flavor...')
//     val = `🍦 ${next} 🍦`
//   }
//
//   Object.defineProperty(target, key, {
//     get:          getter,
//     set:          setter,
//     enumerable:   true,
//     configurable: true
//   })
//
// }
//
// export class IceCreamComponent {
//   @Emoji()
//   flavor = 'vanilla'
// }
//
// const iceCream = new IceCreamComponent()
// console.log(iceCream.flavor)
//
// iceCream.flavor = 'cherry'
// console.log(iceCream.flavor)
//
// namespace C {
//   class C {
//     @readonly
//     @enumerable(false)
//     method() { }
//   }
//
//   function readonly(target, key, descriptor) {
//     descriptor.writable = false
//   }
//
//   function enumerable(value) {
//     return function(target, key, descriptor) {
//       descriptor.enumerable = value
//     }
//   }
// }
