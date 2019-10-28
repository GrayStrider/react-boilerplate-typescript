export { sleep }

/**
 * sleep for x sec
 */
const sleep = (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms))

const asyncText = async (text: string, ms: number) => {
  console.log('waiting ' + (ms / 1000).toFixed(1) + 's..')
  await sleep(ms)
  return text
}

asyncText('test', 1000)
  .then(console.log)
