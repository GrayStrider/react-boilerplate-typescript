export {}

function assertNever(x: never): never {
  throw new Error('Unexpected value. Should have been never.')
}

interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.width * s.height

    // If a new case is added at compile time you will get a compile error
    // If a new value appears at runtime you will get a runtime error
    case 'circle':
      return s.radius
    default:
      // second will work on runtime as well
      const n: never = s
      return assertNever(s)
  }
}

