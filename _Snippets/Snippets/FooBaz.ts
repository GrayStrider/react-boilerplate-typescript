export {}

type Conditions = Map<(i: number) => boolean, string>


const FooBaz = (iterations: number, conditions: Conditions, continueOnFirstMatch: boolean) => {
  iterate:
    for (let i = 0; i < iterations + 1; i++) {
      let fullfilled = false
      for (let [condition, ifTrue] of conditions) {
        if (condition(i)) {
          console.log(ifTrue)
          fullfilled = true
          if (continueOnFirstMatch) continue iterate
        }
      }
      if (!fullfilled) console.log(i)
    }
}

const conditionsMap: Conditions = new Map([
  [(i) => i % 3 === 0, 'Foo'],
  [(i) => i % 5 === 0, 'Divisible by 5!'],
  [(i) => i === 10, 'is 10!'],
])

FooBaz(10, conditionsMap, false)
FooBaz(20, conditionsMap, true)
