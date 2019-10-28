import axios from 'axios'
import nock from 'nock'

export {}

const basePath = 'https://api.github.com/repos/atom/atom/'
const responseBody = {
  license: {
    key: 'mit',
    name: 'MIT License',
    spdx_id: 'MIT',
    url: 'https://api.github.com/licenses/mit',
    node_id: 'MDc6TGljZW5zZTEz',
    param: 'test'
  }
}
axios.defaults.baseURL = basePath

/**
 * basic example
 */
nock(basePath)
  .get('/license')
  .delay(500)
  .reply(200, responseBody)

  // possible to chain
  // regexp
  .get(/.*/)
  .replyWithError('Nothing matched.')


// console.time()
axios
  .get('/license')
  .then(value => {
    // measure the delay
    // console.timeEnd()
    console.log(value.data)
  })
  .catch(console.log)



