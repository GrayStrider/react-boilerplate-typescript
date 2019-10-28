import _ from 'lodash'

export {}

interface Person {
  name: string;
  age: number;
  occupation: string;
}

let person: Person = {
  name: 'Jarid',
  age: 35,
  occupation: 'Janitor'
}

interface Part {
  id: number;
  name: string;
  subparts?: Part[];
  updatePart(newName: string): void;
}

const Options: Record<number, number> = { '33': 4, 10_10: 54.3 /*test: 'str'*/ }
// coerces string number to number
const Options2: Record<string, number> = { 3: 4, 10_10: 54.3 }
// coerces number to string
const Options3: Record<string, number[]> = { 10: [1, 2], 'string': [1, 2, 3] }

enum names {
  prop1, prop2, prop3
}

type ThreeStringProps = Record<names, string>
// equivalent to
type ThreeStringProps2 = { prop1: string, prop2: string, prop3: string }

/**
 * add or remove modifier of a mapped type,
 * that's how Required and Partial works
 */
// const required: Required<Part> = {}
// all are required

const partial: Partial<Part> = { name: 'namestr' }
// all are optional

/** Mapped types */
type Writable<T> = { -readonly [K in keyof T]: T[K] } // removes readonly from object properties
type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };  // Remove readonly and ?
type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };  // Add readonly and ?
type Foo = { a?: string };
type Bar = Required<Foo>;

const Foo3434: Foo = {}

type T44 = Pick<Part, 'id' | 'name'>
const t44: T44 = { id: 30, name: 'namestr' }

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

console.log(pluck(person, ['name', 'occupation']))

const picked = _.pick(person, ['name']) // doesn't infer type..
console.log(picked)

type T45 = Omit<Part, 'updatePart'>
const t45: T45 = { name: 'names', id: 40, subparts: [] }

const readonlyvar: Partial<Readonly<Part>> = { name: 'namestr' }
// readonlyvar.name = ''
// readonlyvar.id = 10 // errors

type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;
// same as T, but with all U values removed
// "b" | "d"
type T02 = Exclude<string | number | (() => void), Function>;
// string | number

type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;
// "a" | "c"
// return those types included in T that are assignable to U
type T03 = Extract<string | number | (() => void), Function>;
// () => void

type T04 = NonNullable<string | number | undefined>;
// string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;

// (() => string) | string[]

function f1(s: string) {
  return { a: 1, b: s }
}

class C {
  x = 0
  y = 0
}

type T10 = ReturnType<() => string>;
// string
type T11 = ReturnType<(s: string) => void>;
// void
type T12 = ReturnType<(<T>() => T)>;
// {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;
// number[]
type T14 = ReturnType<typeof f1>;
// { a: number, b: string }
type T15 = ReturnType<any>;
// any
type T16 = ReturnType<never>;
// any
// type T17 = ReturnType<string>;
// Error
// type T18 = ReturnType<Function>;
// Error

type T20 = InstanceType<typeof C>;
// C
type T21 = InstanceType<any>;
// any
type T22 = InstanceType<never>;
// any
// type T23 = InstanceType<string>;
// Error
// type T24 = InstanceType<Function>;
// Error

// tuple of types of parameters of given function
type FetchDataParams = Parameters<typeof fetchData>; // [number, string]
type IdType = FetchDataParams[0]; // number
function fetchData(id: number, filter: string) {}

function fetchDataLogged(...params: Parameters<typeof fetchData>) {
  console.log('calling fetchData')
  fetchData(...params)
}

const foo = (arg: number, arg2: string) => arg
const params: Parameters<typeof foo> =
  [333, 'this']
console.log(params)
// const constrParams: ConstructorParameters = // for constructor parameters


namespace OneOrMore {

  type OneOrMore<T> = T | T[];

  type Opts<T> = { path: OneOrMore<T> } | { paths: OneOrMore<T> } | never;

  const foo2 = (o: Opts<string>) => {}

// foo2({})


  interface Opts2 {
    paths?: string[],
    path?: string
  }

  type EitherField<T, TKey extends keyof T = keyof T> =
    TKey extends keyof T
    ? { [P in TKey]-?: T[TKey] } & Partial<Record<Exclude<keyof T, TKey>, never>>
    : never

  const foo3 = (o: EitherField<Opts2>) => {}
  foo3({ path: '' })
  foo3({ paths: [''] })
// foo({ path: '', paths: '' }) // error
// foo({}) // error
}
