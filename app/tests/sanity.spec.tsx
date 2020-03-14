import * as React from 'react'
import {render, screen} from '@testing-library/react'

const App: React.FC<{ message: string }> = ({message}) => <div >{message}</div >

it ('should pass', async () => {
  expect.assertions (1)
  expect (true).toStrictEqual (true)

})

it ('should render', async () => {
  expect.assertions (1)

  render (<App message={'Try me!'} />)

  expect (screen.getByText ('Try me!'))
    .toBeInTheDocument ()
})

it ('should fail', async () => {
  expect.assertions (1)
  render (<App message={'Try this!'} />)
  expect (screen.queryByText ('Try me!'))
    .toBeNull ()
})
