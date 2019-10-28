import { objectify } from '../Reference, JS (esnext)/B/Arrays'

describe('objectify', () => {
  it('should convert to object', () => {
    const input = [
      { name: 'Nick', grade: 10 },
      { name: 'John', grade: 15 },
    ]
    const output = { Nick: 10, John: 15 }
    expect(objectify(input)).toMatchObject(output)
  })
})

const testCases: { input: unknown; output: unknown }[] = [
  { input: 1, output: 3 },
  { input: 1, output: 3 },
  { input: 1, output: 3 },
  { input: 1, output: 3 },
]
