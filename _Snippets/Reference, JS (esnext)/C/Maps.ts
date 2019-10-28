/**
 * allows pairs of key/value of any type
 * if specifying values at initialisation, Map type gets locked at the value of first entry
 * Have to use THE SAME object/array/function/etc (non-primities) (const) for set/get
 *
 * the order of insertion preserved.
 */

let typedMap = new Map([
  [() => 0, 40]
])
// typedMap.set(false, {}) // error!

let map = new Map()

const [funcKey, arrKey, objKey, symbolKey] = [
  (arg: unknown) => typeof arg,
  [1, 2, false],
  { prop: 'value!' },
  Symbol('symbol!').description
]

/**
 * possible to chain sets
 */
map.set(funcKey, 'string value!')
   .set(arrKey, ['array value'])
   .set(objKey, { prop2: 'propvalue' })
   .set(symbolKey, Symbol('symbol value!').description)
   .set('stringKey', (arg: string) => arg.toUpperCase() + ' returned through func value')
   .set(NaN, 'NaN value / key')

   /**
    * no way to refer to the function without creating variable,
    * so the only way to access it is through iteration; same with array/objects/etc
    */
   .set(() => 0, 'cant get me!')

console.log(map.get('stringKey')('string'))
console.log(map.get(NaN))
console.log(map.has(NaN))
console.log(map.delete(NaN)) // deletes entry; returns success of the operation
// map.clear() // deletes everything
console.log(map.size)

/**
 * symbols cannot be represented as a string,
 * to log have to use Symbol.description
 *
 * in for/of map.entries() is used by default implicitly
 */
for (const [key, value] of map)
  console.log(key + ': ' + value)

for (const entry of map)
  console.log(entry)

console.log(map)
console.log([...map.entries()])
console.log([...map.values()])
console.log([...map.keys()])

/**
 * built-in iterable method
 */
map.forEach((value, key) =>
  console.log(`${key}: ${value}`))

