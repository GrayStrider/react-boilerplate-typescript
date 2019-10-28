// Overloads

interface Padding {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

function padding(all: number): Padding;
function padding(topAndBottom: number, leftAndRight: number): Padding;
function padding(top: number, right: number, bottom: number, left: number): Padding;
// Actual implementation that is a true representation of all the cases the function body needs to handle
function padding(a: number, b?: number, c?: number, d?: number): Padding {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a
  } else if (c === undefined && d === undefined) {
    c = a
    d = b
  }
  return {
    top: a,
    right: b!,
    bottom: c!,
    left: d!,
  }
}

padding(1, 2)
padding(1)
padding(1, 2, 3, 4)

export {}

namespace OverloadingWithTypeDef {

  interface PaddingFuncWithOverloading {
    (all: number): Padding
    (topAndBottom: number, leftAndRight: number): Padding
    (top: number, right: number, bottom: number, left: number): Padding
  }

  const padding: PaddingFuncWithOverloading =
    (a: number, b?: number, c?: number, d?: number) => {
      if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a
      } else if (c === undefined && d === undefined) {
        c = a
        d = b
      }
      return {
        top: a,
        right: b!,
        bottom: c!,
        left: d!,
      }
    }

  padding(1, 2)
  padding(1)
  padding(1, 2, 3, 4)

}
