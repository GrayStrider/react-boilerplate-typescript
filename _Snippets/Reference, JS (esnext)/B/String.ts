import _ from 'lodash'

export {}
const STR = ' test123TEST 123ee '


console.log(STR.length)
console.log(STR.includes('est'))
console.log(STR.startsWith('t'))
console.log(STR.endsWith('123'))
console.log(STR.indexOf('e'))
console.log(STR.indexOf('123')) // can span multiple characters!
console.log(STR.indexOf('e', 2)) //begin at 2
console.log(STR.lastIndexOf('e'))
console.log(STR.charAt(2))
console.log(STR[3])
console.log(STR.split(' '))
console.log(STR.slice(0, 3))
console.log(STR.slice(-4, -2))
console.log(STR.slice(4, 2)) // from higher to lower, so returns ''; but,
console.log(STR.substring(4, 2)) // works
console.log(STR.substr(4, 2)) // from to length
console.log(STR.trim())
console.log(STR.trimStart())
console.log(STR.trimEnd())
console.log(STR.repeat(3))
console.log(STR.toUpperCase())
console.log(STR.toLowerCase())
console.log(STR.padEnd(30, '...'))
console.log(_.truncate(STR, {length: 10}))
console.log(STR.padStart(25, '-'))
/** iteration */
for (const strElement of STR) console.log(strElement)
console.log([...STR])
let str = 'As sly as a fox, as strong as an ox'
let target = 'as'
let pos = -1
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  console.log(pos)
}

/**  */
console.log(String.fromCharCode(937, 45, 78))
// newer and twice as fast:
console.log(String.fromCodePoint(937, 45, 78))
const peculiarChar = '𝒳' // surrogate pair
console.log(peculiarChar[0] + peculiarChar + peculiarChar.charCodeAt(0) + `, ${peculiarChar.length}!`)


/**
 * tagged template literals
 * note argument types
 */
const F = (strings: TemplateStringsArray, ...values: number[]) => {

  let result = ``

  // Receive **parts of the Template Literal in "strings" and iterate over them
  strings.map((value, index) => {

    // Note: "...values" will hold ${A}, ${B}, and ${C} (see the code below this function)
    // or list of values enumerating all Template Literals (${A}, ${B}, ...) from the TL string

    // Get TL number at current index, but avoid last one, which will always be 'undefined'
    let number = (index <= values.length - 1) ? values[index] : ``

    // Rewrite digits to strings -- this is one of the benefits of using
    // Template Literal-based functions. That is... reformatting the input.
    number == 1 ? number = 'One' : null
    number == 2 ? number = 'Two' : null
    number == 3 ? number = 'Three' : null

    // Combine string and numbers and add to the tail of the running string
    result += value + number
  })

  return result
}
console.log(F` ${3} String ${1} ${2} and this`)

const template = (strings: TemplateStringsArray, ...args: string[]) => {
  let result = strings.map((value, index) =>
    `${index}: ${value}`)
  return [...result, ...args]
}
console.log(template`String Another ${'test'} one`)


//================================================================================
// HTML interpolation
//================================================================================

const say = 'a bird in hand > two in the bush'
const html = htmlEscape`<div> I would just like to say : ${say}</div>`

// a sample tag function
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
  let result = ''

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i]
    result += placeholders[i]
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  // add the last literal
  result += literals[literals.length - 1]
  return result
}

console.log(html)
