import React from 'react'
import {Helmet} from 'react-helmet'

const HomePage = () =>
  <div>
    <Helmet >
      <title >Home Page</title >
      <meta
        name='description'
        content='Home page'
      />
    </Helmet >
    <p>
      Hello, world
    </p>
  </div>

export default HomePage
