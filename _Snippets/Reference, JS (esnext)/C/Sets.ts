export default {}

interface User {
  name: string
}

let john: User = { name: 'John' }
let pete: User = { name: 'Pete' }
let mary: User = { name: 'Mary' }

/**
 * keeps only unique values
 * constructor takes iterable
 *
 * very similar to Map
 * has same key/value pairs, so it would be easier to replace one with another
 */
const arr = [1, 2, 2, 2, 3, 4]
console.log([...new Set(arr).values()])

let set: Set<User> = new Set([{ name: 'Ivan' }])

set.add(john)
   .add(pete)
   .add(mary)
   .add(john)
   .add(mary)
   // same value, but different object!
   .add({ name: 'Ivan' })

console.log(set)
console.log(set.size)

/**
 * same key/value
 */
console.log([...set.entries()])
console.log([...set.keys()])
console.log([...set.values()])
console.log(set.has(john))
console.log(set.has({ name: 'Ivan' })) // different object
console.log(set.delete(mary)) // returns success


for (let user of set) {
  console.log(user.name)
}

set.forEach((user) =>
  console.log(user.name))

set.clear() // deletes everything
console.log(set)
