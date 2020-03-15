import React from 'react'
import {Helmet} from 'react-helmet'
import styled from '@/styles/styled-components'
import {Switch, Route} from 'react-router-dom'
import HomePage from '@/containers/HomePage'
import NotFoundPage from '@/containers/NotFoundPage'
import GlobalStyle from '@/styles/global-styles'
import Header from '@/components/Header'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

const App = () => (
  <AppWrapper >
    <Helmet
      titleTemplate='%s - React.js Boilerplate'
      defaultTitle='React.js Boilerplate'
    >
      <meta name='description' content='A React.js Boilerplate application' />
    </Helmet >
    <Header/>
    <Switch >
      <Route exact path='/' component={HomePage} />
      <Route path='' component={NotFoundPage} />
    </Switch >
    <GlobalStyle />
  </AppWrapper >
)

export default App
