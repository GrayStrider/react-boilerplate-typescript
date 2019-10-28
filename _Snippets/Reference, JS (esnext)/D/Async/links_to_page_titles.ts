import axios, { AxiosResponse } from 'axios'
import * as fs from 'fs'

const path = require('path')

const source = fs.readFileSync(path.resolve(__dirname, './sources.txt'), 'utf8')

let urls = <string[]>source.match(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)
urls = [...new Set(urls)]

const titleR = new RegExp(/(?<=<title>)(.+)(?=<\/title>)/)

const extractTitle = (response: AxiosResponse) =>
  response.data.match(titleR)[0]

const fetchTitles = async (urls: string[]) => {
  const total = urls.length
  let left = urls.length
  const promises = urls.map(url =>
    axios.get(url)
         .then(response => {
             console.log(`[${left}/${total}]`)
             return extractTitle(response)
           },
         ).catch(e => left--))
  return Promise.all(promises)
}

fetchTitles(urls)
  .then(console.log)
