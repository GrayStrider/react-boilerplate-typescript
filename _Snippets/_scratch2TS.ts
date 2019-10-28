import _ from 'lodash'

export interface IFormValues {
  artworkName: string;
  artistName: string;
  number: number
}


const entries = Object.entries as <T>(o: T) =>
  [Extract<keyof T, string>, T[keyof T]][]

type o = { [key: string]: number }
let o: o = { x: 5 }

console.log(entries(o))

let p = <[keyof o, number][]>Object.entries(o)
p.map(([k, v]) => v + 1)


console.log(p)

type oneOf = IFormValues[keyof IFormValues]


function addField<K extends string,
  O extends object,
  V>(object: O, key: K, value: V): O & Record<K, V> {
  return { ...object, [key]: value } as O & Record<K, V>
}

const vector3D = addField({ x: 1, y: 1 }, 'z', 1)

console.log(vector3D)

function addField4<f extends object, a extends { [key: string]: number }>(
  first: f, add: a & { [key in keyof f]?: never }) {
  return { ...first, ...add } as a & f
}

const obj3 = addField4({ a: 2, y: 3 }, { b: 3, z: 4, g: 4 })

type ObjectWithAnyKeyExceptFoo = {
  [key: string]: string
} & { foo?: never };
