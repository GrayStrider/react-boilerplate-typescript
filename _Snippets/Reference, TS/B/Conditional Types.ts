export {}

/**
 * nested ternary expression
 * alternative to switch statements
 * test if T satisfies the condition
 */
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object';

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<'a'>;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"

/**
 * distributive conditional types
 */
type T10 = TypeName<string | (() => void)>;  // "string" | "function"
type T12 = TypeName<string | string[] | undefined>;  // "string" | "object" | "undefined"
type T11 = TypeName<string[] | number[]>;  // "object"

/**
 * Notice that T has the additional constraint any[]
 * within the true branch of Boxed<T> and it is therefore
 * possible to refer to the element type of the array as T[number]
 */
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[]
                ? BoxedArray<T[number]>
                : BoxedValue<T>;

type T20 = Boxed<string>;  // BoxedValue<string>;
type T21 = Boxed<number[]>;  // BoxedArray<number>;
type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>
type T23 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>

const boxed1: T20 = { value: 'string_value' }
const boxed2: T21 = { array: [1, 2, 3] }
// const boxed3: T22 = {} // can be either!

/**
 * The distributive property of conditional types
 * can conveniently be used to filter union types:
 */
type Diff<T, U> = T extends U ? never : T;  // Remove types from T that are assignable to U
type Filter<T, U> = T extends U ? T : never;  // Remove types from T that are not assignable to U

type T30 = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "b" | "d"
type T31 = Filter<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // "a" | "c"
type T32 = Diff<string | number | (() => void), Function>;  // string | number
type T33 = Filter<string | number | (() => void), Function>;  // () => void

type NonNullable<T> = Diff<T, null | undefined>;  // Remove null and undefined from T

type T34 = NonNullable<string | number | undefined>;  // string | number
type T35 = NonNullable<string | string[] | null | undefined>;  // string | string[]

const f1 = <T>(x: T, y: NonNullable<T>) => {
  // x = y  // Ok, warning
  // y = x  // Error
}
const f2 = <T extends string | undefined>(x: T, y: NonNullable<T>) => {
  // x = y  // Ok, warning
  // y = x  // Error
  // let s1: string = x  // Error
  let s2: string = y  // Ok
  // let s3: undefined = y // error
}

const t30: T30 = 'b' // "b" | "d"
const t31: T31 = 'a' // "a" | "c"


/**
 * Conditional types are particularly
 * useful when combined with mapped types:
 */

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  price: number
  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>;  // "updatePart"
type T41 = NonFunctionPropertyNames<Part>;  // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part>;  // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part>;  // { id: number, name: string, subparts: Part[] }

type test<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

const test: test<Part> = 'name'

interface User {
  id: number;
  name: string;
  points: number;
  action: () => void
}

type numberKeys = User[keyof User]
type keys = keyof User


/**
 * mapped types
 */
type PropsOfType<T, T2> = {
  [K in keyof T]: T[K] extends T2 ? K : never
}[keyof T];

type T45 = PropsOfType<Part, number>

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never

const getType: GetElementType<number[]> = 0
const getType2: GetElementType<string[]> = '0'
const getTypeTuple: GetElementType<['const', 40]> = 40/*'const'*/


type MapArraysToValues<T extends { [key: string]: any[] }> = {
  [key in keyof T]: GetElementType<T[key]>;
};

// Output === { x: number, y: string }
type Output = MapArraysToValues<{ x: number[], y: string[] }>;


function excludeTag<T extends { tag: string }>(obj: T) {
  let { tag, ...rest } = obj
  return rest  // Pick<T, Exclude<keyof T, "tag">>
}

const taggedPoint = { x: 10, y: 20, tag: 'point' }
const pointWithoutTag = excludeTag(taggedPoint)  // { x: number, y: number }
console.log(pointWithoutTag)
