export {}
import {Promise} from 'bluebird'

/**
 * basic promise template
 */
const promise = (param: boolean) =>
  new Promise((resolve, reject) => {
    param
    ? resolve('Resolved!')
    : reject(new Error('Rejected.'))
  })

// promise(false)
//   .then(console.log)
//   .catch(console.log)

/**
 * .spead assumes the returned value is array;
 * can be replaced with .then destructuring,
 * but .spread implicitly does .all, unlike spead
 */
Promise
  .all([2, 2])
  // .spread()
  .then(([first, second]) =>
    first === second
    ? console.log('equal!')
    : console.log('not equal!'))


const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]

/**
 * standart map/reduce/filter
 */
Promise
  .map(promises,
    (promise) => promise + '_appended')
  .then(console.log)

Promise
  .all([1, 2, 3, 4])
  .reduce((memo, item) => memo + item, 0)
  .then(console.log)

Promise.reduce(promises,
  (total, current, index, arrayLength) => {
    console.log({
      total, current, index, arrayLength,
    })
    return current + total
  }, 0)
       .then(console.log)

Promise
  .filter(promises,
    (resolved) => resolved < 2)
  .then(console.log) // [1]
