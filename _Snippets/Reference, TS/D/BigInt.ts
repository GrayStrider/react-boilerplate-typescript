export {}

let foo: bigint = BigInt(100) // the BigInt function
let bar: bigint = 100n        // a BigInt literal

// *Slaps roof of fibonacci function*
// This bad boy returns ints that can get *so* big!
function fibonacci(n: bigint) {
  let result = 1n
  for (let last = 0n, i = 0n; i < n; i++) {
    const current = result
    result += last
    last = current
  }
  return result
}

console.log(fibonacci(10000n))
