import axios, { AxiosResponse } from 'axios'
import Promise from 'bluebird'

export {}

async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000)
  })
  console.log(await promise) // "done!"
}

f()
console.log('after') // goes first!

namespace AxiosFetchHondasAsyncAwait {
  const hondas = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/honda?format=json'

  interface vhpicResponse {
    Results: vhpicResults[]
  }

  interface vhpicResults {
    Make_ID: number
    Make_Name: string
    Model_ID: number
    Model_Name: string
  }

  const formatResponse = (response: AxiosResponse<vhpicResponse>, key: keyof vhpicResults) =>
    response.data.Results.map(value => value[key])

  /**
   * fetches car models
   */
  const example = async (key: keyof vhpicResults) => {
    const data = await axios.get(hondas)
    return formatResponse(data, key)
  }

  example('Model_Name').then(console.log)
}
