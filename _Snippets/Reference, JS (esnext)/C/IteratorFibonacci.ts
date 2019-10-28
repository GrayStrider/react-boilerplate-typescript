class Fib implements IterableIterator<number> {
  protected fn1 = 0
  protected fn2 = 1

  constructor(protected maxValue?: number) {}

  public next(): IteratorResult<number> {
    const current = this.fn1
    this.fn1 = this.fn2
    this.fn2 = current + this.fn1
    if (this.maxValue != null && current >= this.maxValue) {
      return {
        done: true,
        value: null,
      }
    }
    return {
      done: false,
      value: current,
    }
  }

  [Symbol.iterator](): IterableIterator<number> {
    return this
  }
}

let fib = new Fib()

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50)
console.log(Array.from(fibMax50))
// [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21)
for (let num of fibMax21) {
  console.log(num) //Prints fibonacci sequence 0 to 21
}
// ??? doesn't work
console.log([...fibMax21])
