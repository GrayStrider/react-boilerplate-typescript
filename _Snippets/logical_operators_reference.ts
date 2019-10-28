/**
 * Use instead of ternaries; be mindful '', [], 0 === false
 */

/**
 * returns the first falsy value;
 * otherwise returns the last truthy value
 */
console.log(true && true) // t && t returns true
console.log(true && false) // t && f returns false
console.log(false && true) // f && t returns false
// @ts-ignore
console.log(false && (3 === 4)) // f && f returns false
console.log('Cat' && 'Dog') // t && t returns "Dog"
console.log(false && 'Cat') // f && t returns false
console.log('Cat' && false) // t && f returns false
console.log('' && false) // f && f returns ""
console.log(false && '') // f && f returns false


/**
 * returns the first truthy value;
 * otherwise returns the last falsy value
 */
console.log(true || true) // t || t returns true
console.log(false || true) // f || t returns true
console.log(true || false) // t || f returns true
// @ts-ignore
console.log(false || (3 == 4)) // f || f returns false
console.log('Cat' || 'Dog') // t || t returns "Cat"
console.log(false || 'Cat') // f || t returns "Cat"
console.log('Cat' || false) // t || f returns "Cat"
console.log('' || false) // f || f returns false
console.log(false || '') // f || f returns ""
console.log(false || [1, 2, 3]) // f || object returns object

const empty = true

/**
 * goes from left to right, just like ternary
 */
console.log('' || empty && 0)
