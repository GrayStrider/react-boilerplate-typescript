import * as React from 'react'
import loadable from '@/utils/loadable'
import LoadingIndicator from '@/components/LoadingIndicator'

export default loadable (() => import('app/containers/HomePage/component'), {
  fallback: <LoadingIndicator />,
})
