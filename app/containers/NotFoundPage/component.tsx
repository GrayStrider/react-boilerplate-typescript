import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import H1 from '@/components/H1'
import messages from 'app/containers/NotFoundPage/messages'

const NotFound = () =>
  <article >
    <H1 >
      <FormattedMessage {...messages.header} />
    </H1 >
  </article >

export default NotFound
