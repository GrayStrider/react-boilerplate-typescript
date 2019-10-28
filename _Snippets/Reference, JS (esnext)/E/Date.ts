/**
 * date object,
 * by default shows current date/time
 * Unix timestamp
 * String, Date.parse
 * year/month/day/hour/...
 *
 * will autocorrect if out-of-range values are used
 *
 * can be substracted (operation on Unix time)
 */
console.log(new Date())
console.log(Date.now()) // can be used to calculate execution time
console.log(new Date(9005600000))
console.log(new Date('2017-12-05'))
console.log(new Date(2018, 4, 23, 5))

const date = new Date(2019)

// different get/set methods
