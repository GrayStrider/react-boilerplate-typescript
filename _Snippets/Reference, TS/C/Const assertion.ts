export {};

// Works with no types referenced or declared.
// We only needed a single const assertion.
function getShapes() {
  return [
    { kind: 'circle', radius: 100 },
    { kind: 'square', sideLength: 50 },
  ] as const;
}

for (const shape of getShapes()) {
  if (shape.kind === 'circle') {
    const radius: number = shape.radius; // throws error without as const
  } else {
    const length: number = shape.sideLength;
  }
}

const ORIGIN = {
  x: 0,
  y: 0,
} as const;
// equivalent to
const ORIGIN2: {
  readonly x: 0;
  readonly y: 0;
} = {
  x: 0,
  y: 0,
};

const vec = [0, 2] as const; // readonly [0, 2]
const vec2 = [0, 2]; // number[]
