export {}

// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
  return [
    { kind: 'circle', radius: 100 },
    { kind: 'square', sideLength: 50 }
  ] as const
}

for (const shape of getShapes()) {
  if (shape.kind === 'circle') {
    const radius: number = shape.radius // throws error without as const
  } else {
    const length: number = shape.sideLength
  }
}

const x_ = { x: 'test' } as const // readonly
console.log(typeof x_.x)

/**
 * makes tuple types
 */
const arr = ['string'] as const
console.log(arr)

const str: 'string!' = 'string!' // will not widen
const str2 = 'string!' as const

console.log(typeof str2) // type 'string!'
const str4: string = 'string!' as const
console.log(str4, str)
