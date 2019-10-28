import axios, { AxiosResponse } from 'axios'
import Promise from 'bluebird' // provides more utility functions

/**
 * also look for examples: bluebird.ts
 */

export {}

namespace callback {
  const callingCallback =
    (input: string, callback: (input: string) => void) => {
      const doStuff = input.toUpperCase()
      // ...
      callback(doStuff)
    }

  // callingCallback(
  //   'hello',
  //   (input) => console.log('callback:', input)
  // ) // HELLO
}

namespace promise {
  /**
   * The call .catch(f) is a complete analog of
   * .then(null, f), it’s just a shorthand.
   */
  const promise = (param: string) =>
    new Promise((resolve, reject) =>
      /**
       * reject promise if param too short
       *
       * When a promise rejects, the control
       * jumps to the closest rejection handler
       */
      param.length > 1
      ? setTimeout(() => resolve(param), 1000)
      : reject(new Error('param too short!'))
    )

  // promise('1')
  //   .finally(() => console.log('ready!'))
  //   .then(
  //     (result) => console.log(result),
  //     (error) => console.log(error))
  //
  // promise('ok').then(
  //   (result) => console.log(result),
  //   (error) => console.log(error))


}

namespace API {
  /**
   * Promise.all
   * 60 requests per hour for unauntheficated
   */
  let names = ['iliakan', 'remy', 'jeresig']

  // let requests = names.map(name => axios.get(`https://api.github.com/users/${name}`))
  //
  // const example = () =>
  //   Promise.all(requests)
  //          .then(responses => {
  //            // all responses are resolved successfully
  //            for (let response of responses) {
  //              console.log(`${response.config.url}: ${response.status}`) // shows 200 for every url
  //            }
  //
  //            return responses
  //          })
  //          // map array of responses into array of response.json() to read their content
  //          .then(responses => Promise.all(responses.map(r => r)))
  //          // all JSON answers are parsed: "users" is the array of them
  //          .then(users => users.forEach(user => console.log(user)))
  //

  /**
   * Promise.allSetted
   * Promise.allSettled waits for all promises to settle. The resulting array has:

   {status:"fulfilled", value:result} for successful responses,
   {status:"rejected", reason:error} for errors.
   */


  /**
   * Promise.race
   * waits for the first settled promise, ignores rest
   */

}

namespace chaining {
  /**
   * As a good rule, an asynchronous action
   * should always return a promise.
   * That makes it possible to plan actions after it.
   * Even if we don’t plan to extend the chain now, we may need it later.
   */
  const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  })

  const multiply = (result: number) => {
    console.log(result) // 1
    return result * 2
  }

  // promise
  //   .then(multiply) //1
  //   .then(multiply) //2
  //   .then(multiply) //4
}

namespace AxiosFetchHondas {
  const hondas = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/honda?format=json'

  interface vhpicResponse {
    Results: vhpicResults[]
  }

  interface vhpicResults {
    Make_ID: number,
    Make_Name: string,
    Model_ID: number,
    Model_Name: string
  }

  const formatResponse = (
    response: AxiosResponse<vhpicResponse>,
    key: keyof vhpicResults) =>
    response
      .data.Results
      .map((value) => value[key])

  /**
   * fetches car models
   */
  const example = () =>
    axios.get(hondas)
         .then((value) =>
           console.log(formatResponse(value, 'Model_Name')))
         .catch(console.log)

  // example()
}

namespace alwaysAsync {
  let promise = Promise.resolve()

  promise
    .delay(2000)
    .then(() => console.log('promise done!'))

  console.log('code finished') // this console.log shows first
}
