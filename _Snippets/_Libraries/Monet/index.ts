import { Maybe, None, Some, Right, Either, Left } from 'monet'


const foo = (arg: Maybe<string>) =>
  arg
    .map(String.prototype.toUpperCase)
    .map(String.prototype.trimEnd)

enum Err {
  BadJson,
  EmptyJson,
  NoTitle,
  NoTag
}

const json = '{ "title": "Some string title","desc": "Some description"}'

const parseJson = <T>(json: string): T =>
  JSON.parse(json)

const result = <Config>JSON.parse(json)
console.log(result)

const parseJSON = <T>(json: string): Either<Error, T> => {
  try {
    return Right(<T>JSON.parse(json))
  } catch (e) {
    return Left(e)
  }

}

interface Config {
  title: string;
  desc: string;
}


const eitherTitle = parseJSON<Config>(json)
  .flatMap((data: Config) => data
                             ? Right(data)
                             : Left(new Error('Parsed data is empty.')))
//--- Doesn't infer types correctly; seems to be too niche to continue.
console.log(eitherTitle)

