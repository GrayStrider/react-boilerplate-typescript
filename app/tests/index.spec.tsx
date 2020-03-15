import '@testing-library/jest-dom'
import * as React from 'react'
import { render } from '@testing-library/react'
import AppWrapper from '@/wrapper'


it ('should have features button', async () => {
  expect.assertions (1)
  const { findByText } = render (<AppWrapper />)
  let act = await findByText ('Hello, world')
  expect (act).toBeInTheDocument ()
})
