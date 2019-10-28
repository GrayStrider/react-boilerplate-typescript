export default {}

interface Task {
  id: number,
  title: string,
  status: Status
}

const status = ['done', 'todo', 'inProgress'] as const
type Status = typeof status[number]

const tasks: Task[] = [
  { id: 1, title: 'A Job', status: 'done' },
  { id: 2, title: 'B Job', status: 'inProgress' },
  { id: 5, title: 'E Job', status: 'todo' },
  { id: 3, title: 'C Job', status: 'todo' },
  { id: 4, title: 'D Job', status: 'inProgress' }
]

const sortBy = ['inProgress', 'done', 'todo'] as const

type SortBy = typeof sortBy

const customSort = (data: Task[], sortBy: SortBy, sortField: keyof Task) => {
  const sortByObject = sortBy.reduce(
    (obj: { [key: string]: number }, item, index) => ({
      ...obj,
      [item]: index
    }), (<{ [p: string]: number }>{})) //?
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
}

console.log(customSort(tasks, sortBy, 'status'))
