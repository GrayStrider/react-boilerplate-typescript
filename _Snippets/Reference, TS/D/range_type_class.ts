export default {}


const Range = (min: number, max: number) => {
  if (min > max) {
    throw new Error('min cannot be more than max')
  }
  return [min, max]
}

type range = typeof Range
const NumberInRange = (number: number, range: range) => {
  if (number < range[0] || number > range[1]) throw new Error('not in range')
  return number
}

type numberInRange = typeof NumberInRange

class myNumber {
  private _value: number

  constructor(private minVal = 1, private maxVal = 100, value: number) {
    if (minVal > maxVal) {
      throw new RangeError('min value is great than max value')
    }

    if (this.isValid(value)) {
      this._value = value
    } else {
      throw new RangeError(`${value} does not fall between ${this.minVal} and ${this.maxVal}`)
    }
  }

  get value(): number {
    return this._value
  }

  public setValue(value: number) {
    if (this.isValid(value)) {
      this._value = value
    } else {
      throw new RangeError(`${value} does not fall between ${this.minVal} and ${this.maxVal}`)
    }
  }

  private isValid(value: number): boolean {
    return (value <= this.maxVal && value >= this.minVal)
  }
}


const range100 = (value) => new myNumber(0, 100, value)

class Range100class {
  private readonly _value: number

  constructor(value) {
    if (value < 0 || value > 100) throw new Error('error')
    this._value = value
  }

  get value(): number {
    return this._value
  }

}

const foo = value => {
  return range100(value).value
}

foo(100) //?

const foo2 = (num: Range100class) => num.value

foo2(new Range100class(100)) //?

// make factory
