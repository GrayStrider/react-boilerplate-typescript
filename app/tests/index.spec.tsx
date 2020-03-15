import '@testing-library/jest-dom'
import * as React from 'react'
import {render} from '@testing-library/react'
import AppWrapper from '@/wrapper'


it ('should have features button', async () => {
  expect.assertions (1)
  const app = render (<AppWrapper/>)
  const act = app.queryByText ('Features')
  expect (act).toBeInTheDocument ()

})
