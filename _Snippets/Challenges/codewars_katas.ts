/**
 * delete occurences of an element if it occurs more than x times
 * @param arr
 * @param x
 */
const deleteNth = (arr: (number)[], x: number) => {
  const cache: {
    [index: number]: number
  } = {}
  return arr.filter(n => {
    cache[n] = (cache[n] || 0) + 1
    return cache[n] <= x
  })
}

// console.log(deleteNth([1, 1, 2, 3, 4, 5, 6], 1))

/**
 Given a list of integers and a single sum value,
 return the first two values (parse from the left please) in order of appearance that add up to form the sum.
 */

const sum_pairs = (ints: number[], sum: number): number[] => {
  const seen: { [key: number]: boolean } = {}
  for (let i = 0; i < ints.length; ++i) {
    if (seen[sum - ints[i]]) return [sum - ints[i], ints[i]]
    seen[ints[i]] = true
  }
  return []
}

console.log(sum_pairs([10, 5, 2, 3, 7, 5, -10], -5))

/**
 * find the outlier
 * either one odd, or one even
 * @param int
 */
const findOutlier = (int: number[]) => {
  const even = int.filter(a => a % 2) // filter by even
  const odd = int.filter(a => (!(a % 2))) // filter by odd
  return even.length === 1 ? even[0] : odd[0] // whichever has one alement is the one we need.
}

export default {}
