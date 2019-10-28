import util from 'util'

const setTimeoutPromise = util.promisify(setTimeout)

const main = async () => {
  console.log('sleeping')
  await setTimeoutPromise(3000, () => null)
  return 'after sleep'
}

main()
  .then(console.log)


