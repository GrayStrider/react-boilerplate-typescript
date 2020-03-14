import '@testing-library/jest-dom'
import * as React from 'react'
import {render} from '@testing-library/react'
import {App_} from '@/App2'


it ('should have features button', async () => {
  expect.assertions (1)
  const app = render (<App_ />)
  const act = app.queryByText ('Features')
  expect (act).toBeInTheDocument ()

})
