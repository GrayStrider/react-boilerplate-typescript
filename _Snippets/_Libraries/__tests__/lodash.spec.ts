import { capitalize, doubleSay, exclaim, myFlow } from '../lodash'

it('should do the thing', () => {
  const cases: [Array<(arg: any) => any>, string][] = [
    [[capitalize, doubleSay, exclaim], 'Hello, Hello!'],
    [[], 'hello'],
    [[exclaim], 'hello!'],
  ]
  for (let [funcs, expected] of cases) {
    expect(myFlow(funcs)('hello')).toBe(expected)
  }
})
it('should capitalize', () => {
  const [exp, act] = ['A', capitalize('a')]
  expect(act).toBe(exp)
})

