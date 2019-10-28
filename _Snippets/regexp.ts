export default {}

/**
 * - destructuring
 * global match (/g) will return only full matches
 * without capture groups!
 * except when using .replace
 */
const parseProtocol = (url: string) => {
  const parsedURL = /^(\w+):\/\/([^\/]+)\/(.*)$/.exec(url)
  if (!parsedURL) {
    return null
  }
  /** named capture groups do not work well with TS; use sequentual destructuring */
  const [, protocol, fullhost, fullpath]: string[] = parsedURL
  return [protocol, fullhost, fullpath]
}

/**
 * filter out numbers;
 * .test
 */
const obj: { data: string }[] = [
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test' },
  { data: 'test2' },
]
console.log(obj
  .filter(item => !/\d/.test(item.data))
  .map(item => item.data)
  .join('-'))


const test = '12weord test'
// Non-capturing group:
console.log(test.match(/(?:\d+)(\w+)/))
// Positive lookahead: (one or more \d, followed by one or more \w)
console.log(test.match(/(\d+)(?=\w+)/))
// Negative lookahead: matches only 1 digit, otherwise would had to return null (pattern shouldn't match)
console.log(test.match(/(\d+)(?![a-z]+)/))
// Positive lookbehind: does not create a group; must have a fixed width!
console.log(test.match(/(?<=\d{2})(\w*)/))
// Negative lookbehind: only foo that is not being preceded by 'not '; must have fixed width!
const foo = 'not foo but foo'
console.log(foo.match(/(?<!not )foo/))
console.log(test.match(/(?<!\d{2})[a-z]+/gi))
// only matches the one with gidits; can't figure out how to reverse
console.log(test.match(/(\d+)[a-z]+/gi))

const regExp = /(?<=Strider)(🐌)/gi
console.log(regExp.test('Strider🐌'))

'Stride4r🐌'.match(regExp)


/**
 * using (skip, skip, ..., value) => value replacer (string destructuring)
 * doesn't look very reliable
 *
 * Alternative: second regexp for matching required character/s
 * Notice non-null assertion before [0] !
 * (I handle the possible null in return statement)
 *
 * UPDATE:
 * it's not string destructuring, replace actually returns capture groups
 * even with /g. (look ...rest)
 */
const text = 'test_abas_ere_fd_JF'
const regexp = /[_-](.)/gi
const regexpReplacer = /(?<=[_-])(.)/ig

console.log(text
  .replace(regexp,
    (fullMatch, firstGroup, ...rest: any[]) =>
      firstGroup.toLowerCase()),
)

console.log(text
  .replace(regexp,
    (x) => {
      console.log(x)
      const match = x
        .match(regexpReplacer)![0]
      return match.toUpperCase() || ''

    }))

/**
 * backreference; no way to modify the value before replacement
 */
console.log(text
  .replace(regexp, '$1'),
)

console.log(
  [1, 4, 5, 6, 3, 4, 2, 12, 0, null]
    .map(value => value || 'empty'),
)

const str = '1 2 3 tes tes F F'
const match = str.match(/(<numbers>\d)/g)

