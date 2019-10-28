export default {}

class Car {
  Rent(type: string): this {
    console.log(`${type} has been rented.`)
    return this
  }

  Record(): this {
    console.log(`Car was rented at ${new Date().toLocaleString()}`)
    return this
  }

  Return(type: string): this {
    console.log(`${type} has been returned.`)
    return this
  }
}

class ElectricCar extends Car {
  Charge(): this {
    console.log(`Electric car has been charged.`)
    return this
  }
}

class GasCar extends Car {
  Refill(): this {
    console.log(`Gas car has been refilled.`)
    return this
  }
}

let electricCar = new ElectricCar()
electricCar
  .Rent('Electric car')
  .Record()

electricCar.Return('Electric car') // Electric car has been returned.
           .Record() // logs current date and time.
           .Charge() // Electric car has been charged.

let gasCar = new GasCar()
gasCar
  .Rent('Gas car') // Gas car has been rented.
  .Record() // logs current date and time

gasCar.Return('Gas car') // Gas car has been returned.
      .Record() // logs current date and time.
      .Refill() // Gas car has been refilled.
