/**
 * Testing the NotFoundPage
 */

import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import NotFound from 'app/containers/pages/NotFoundPage/index'
import messages from 'app/containers/pages/NotFoundPage/messages'

describe ('<NotFound />', () => {
  it ('should render the Page Not Found text', () => {
    const {queryByText} = render (
      // tslint:disable-next-line: jsx-wrap-multiline
      <IntlProvider locale='en' >
        <NotFound />
      </IntlProvider >,
    )
    expect (queryByText (messages.header.defaultMessage)).toBeInTheDocument ()
  })
})
