import { DiffObjects, IsNonUndefined, UnionObjects } from 'tsdef'

export {}

const isNonNull: IsNonUndefined<string, number> = 10

const one = {
  prop: 'test',
  prop2: 'test2',
}

const two = {
  prop: 'test',
  prop3: 'test3',
}

const diff: DiffObjects<typeof two, typeof one> = {
  prop3: '',
}

const diff2: DiffObjects<typeof one, typeof two> = {
  prop2: '',
}

const union:
  UnionObjects<typeof one, typeof two> = {
  prop2: '',
  prop: '',
  prop3: '',
}

const union2:
  typeof one & typeof two = {
  prop: '',
  prop2: '',
  prop3: '',
}
