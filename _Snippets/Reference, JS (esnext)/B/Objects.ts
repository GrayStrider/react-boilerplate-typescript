import { Number, Record, Static, String } from 'runtypes'

export {}

interface Person {
  readonly name: string
  age: number
  grades: number[]
  isEmployed: boolean
  action(subj: string): string
}

/**
 * Runtypes
 */
const Name = String.withConstraint(x => (
  /^[A-Z][a-z]+$/.test(x)
  && (x.length > 1 && x.length < 21))
  || `${x} doesn't match required format: "Abcd", 2-20 chars`)

const Person = Record({
  name: Name,
  age: Number.withConstraint(x => x >= 0 && x <= 200),
})
// appending readonly attribute to inferred type
type TPerson = Static<typeof Person> & { readonly name: string }

const me: TPerson = Person.check({ name: 'Ivan', age: 10 })
me.age++

const target = {
  newprop: 'newPropValue',
  symbol: Symbol('hi'),
}

/**
 * Object with types
 */
const person: Person = {
  name: 'John',
  age: 30,
  grades: [20, 5, 3],
  isEmployed: false,
  action: (subj) => subj.toUpperCase(),
}

/**
 * combination with Map
 * combination of entries/fromEntries can be used to
 * modify object with map/filter/reduce/etc
 * although, lodash is a better alternative
 *
 * JSON.stringify
 * JSON.parse parses a string to object,
 * use 'replacer' to transform data types based on key name
 */
let map = new Map(
  Object.entries(person),
)
console.log(map.get('name'))
console.log(map.get('action')('test'))
// ...and the other way:
console.log(JSON.stringify(
  Object.fromEntries(map), // implicit .entries()
  // methods are omitted!
))

console.log(JSON.stringify(
  { ...person, prop: { age: 40 } },
  (key, value) =>
    key === 'age' ? undefined : value,
  // all except 'age'; RECURSIVELY REMOVED SECOND NESTED 'age'
  2,
))
/**
 * Methods
 */
console.log(person.action('testString'))
console.log(person.isEmployed)
console.log(!!person['grades'])
console.log('grades' in person)

// etc
console.log(Object.keys(person))
console.log(Object.entries(person))
const person2 = Object.assign(target, person) // enumerable only
console.log(person2)
console.log(Object.seal(person2)) //prevent modification
// person2['anotherProp'] = 'test' //error
person2.age = 99 // allowed!
console.log(Object.isSealed(person2))
console.log(Object.isExtensible(person2))
console.log(Object.getOwnPropertyDescriptors(['test']))
console.log(Object.freeze(person2))
// person2.age = 30 // error! Frozen!
console.log(Object.isFrozen(person2))
// freezing/sealing is permanent for the object.
console.log(person2.hasOwnProperty('age'))
console.log(Object.getOwnPropertyNames(person2))
console.log(Object.getOwnPropertyDescriptors(person2))
console.log(Object.getOwnPropertySymbols(person2))
console.log(Reflect.ownKeys(person2))

console.log(Object.is(person, person))
console.log(Object.is('person', person))
console.log(Object.is('person', 'person'))
console.log(Object.is(1, 1))
