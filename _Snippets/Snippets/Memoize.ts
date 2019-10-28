export default {}

let slow = (x: any) => {
  // there can be a heavy CPU-intensive job here
  console.log(`Called with ${x}`)
  return x
}

const memoize = <Arg extends any, Func extends (arg: Arg) => any>(func: Func) => {
  let cache: Map<Arg, ReturnType<Func>> = new Map()

  return (arg: Arg) => {
    if (cache.has(arg)) {
      console.log(`returned result of ${arg} from cache`)
      return <ReturnType<Func>>cache.get(arg)
    }

    let result: ReturnType<Func> = func(arg)  // otherwise call func
    console.log('from catche')
    cache.set(arg, result)  // and cache (remember) the result
    return result
  }
}


const slow2 = memoize(slow)
console.log(slow2(30))

console.log(slow(1)) // slow(1) is cached
console.log('Again: ' + slow(1)) // the same

console.log(slow(2)) // slow(2) is cached
console.log('Again: ' + slow(2)) // the same as the previous line

const foo: Function = () => 0
console.log(foo())
