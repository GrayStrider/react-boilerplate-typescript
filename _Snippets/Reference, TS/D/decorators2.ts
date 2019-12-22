export {}

//================================================================================
// Class decorator
//================================================================================

function smithFamily<T extends Constructor<any>>(constructor: T) {
  return class extends constructor {
    lastName = 'Smith'
  }
}

@smithFamily
class Person {
  firstName: string

  constructor(m: string) {
    this.firstName = m
  }
}

console.log(new Person('John'))

//================================================================================
// Method decorator
//================================================================================

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value
  descriptor.value = function() {
    console.log('logging a statement before running function')
    return originalMethod.apply()
  }
}

class SomeClass {
  @log
  someMethod() {
    console.log('running someMethod')
  }
}

let myClass = new SomeClass()
myClass.someMethod()
