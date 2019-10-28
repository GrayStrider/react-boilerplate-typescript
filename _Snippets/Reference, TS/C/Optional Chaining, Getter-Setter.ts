import { oc } from 'ts-optchain'

/**
 * Not needed with optional chaining introduced in 3.7, except perhaps for default option
 */

class Player {
  private _wins: number = 0
  private _active: boolean = false

  constructor(
    private readonly _name: string,
    private readonly _id: string) {
  }

  public get active(): boolean {
    return this._active
  }

  public set active(value: boolean) {
    this._active = value
  }

  public get playerName(): string {
    return this._name
  }

  public get playerID(): string {
    return this._id.toUpperCase()
  }

  public get wins(): number {
    return this._wins
  }
}

const player = new Player('sam', 'qwe')
console.log(player.wins)
console.log(player.playerID)
console.log(player.active)
player.active = true
console.log(player.active)

let data: { passcode?: string } = { passcode: 'secret passcode' }
let data2: { passcode?: string } = {}

class Employee {

  constructor(private _fullName: string) {

  }

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    const passcode = oc(data2).passcode('default optional, could be undefined')
    console.log(passcode)
    if (passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employee = new Employee('Bob Smith')
console.log(employee.fullName)
employee.fullName = 'Hi'
console.log(employee.fullName)


/**
 * https://stackoverflow.com/questions/15260732/does-typescript-support-the-operator-and-whats-it-called
 **/
export const o = <T>(someObject: T, defaultValue: T = {} as T): T => {
  if (typeof someObject === 'undefined' || someObject === null)
    return defaultValue
  else
    return someObject
}

namespace tsOptchainExamples {
  interface I {
    a?: string;
    b?: {
      d?: string;
    };
    c?: Array<{
      u?: {
        v?: number;
      };
    }>;
    e?: {
      f?: string;
      g?: () => string;
    };
  }

  const x: I = {
    a: 'hello',
    b: {
      d: 'world',
    },
    c: [{ u: { v: -100 } }, { u: { v: 200 } }, {}, { u: { v: -300 } }],
  }

  // Here are a few examples of deep object traversal using (a) optional chaining vs
  // (b) logic expressions. Each of the following pairs are equivalent in
  // result. Note how the benefits of optional chaining accrue with
  // the depth and complexity of the traversal.

  console.log(oc(x).a())
  console.log(x.a)

  console.log(oc(x).b.d())
  console.log(x.b && x.b.d)

  console.log(oc(x).c[0].u.v())
  console.log(x.c && x.c[0] && x.c[0].u && x.c[0].u.v)

  console.log(oc(x).c[100].u.v())
  console.log(x.c && x.c[100] && x.c[100].u && x.c[100].u.v)

  console.log(oc(x).c[100].u.v(1234))
  console.log((x.c && x.c[100] && x.c[100].u && x.c[100].u.v) || 1234)

  console.log(oc(x).e.f())
  console.log(x.e && x.e.f)

  console.log(oc(x).e.f('optional default value'))
  console.log((x.e && x.e.f) || 'optional default value')

// NOTE: working with function value types can be risky. Additional run-time
// checks to verify that object types are functions before invocation are advised!
  console.log(oc(x).e.g(() => 'Yo Yo')())
  console.log(((x.e && x.e.g) || (() => 'Yo Yo'))())
}
