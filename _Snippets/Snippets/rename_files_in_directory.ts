import * as fs from 'fs'

const dir = 'C:\\tools\\bash test\\'

/**
 * remove extra _s if any
 */
const regex = /^(?:_+)?(.*?)(?:_+)?$/gi

const renameFile = (file: string) => {
  const nameParts = file.match(/(.*)(\..*)/)
  if (nameParts) {
    const [, name, extension] = nameParts
    fs.rename(
      dir + file,
      dir + name.replace(regex, '_$1_') + extension,
      (console.log))
  }

}

fs.readdirSync(dir)
  .forEach(file => {
      try {
        renameFile(file)
      } catch { // can omit variable
        console.log('Error')
      }
    }
  )

