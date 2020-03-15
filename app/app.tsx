import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FontFaceObserver from 'fontfaceobserver'
import 'sanitize.css/sanitize.css'
import App from '@/containers/App'
// import '!file-loader?name=[name].[ext]!./static/images/favicon.ico'
// import 'file-loader?name=.htaccess!./.htaccess'
import {translationMessages} from '@/translations/i18n'
import AppWrapper from '@/wrapper'

const openSansObserver = new FontFaceObserver ('Open Sans', {})
openSansObserver.load ().then (() => {
  document.body.classList.add ('fontLoaded')
})

const MOUNT_NODE = document.getElementById ('app') as HTMLElement


const render = (messages: any, Component = App) => {
  ReactDOM.render (
    <AppWrapper/>,
    MOUNT_NODE,
  )
}

if (module.hot) {
  module.hot.accept (['@/translations/i18n', './containers/App'], () => {
    ReactDOM.unmountComponentAtNode (MOUNT_NODE)
    // tslint:disable-next-line:max-line-length
    const App = require ('./containers/App').default // https://github.com/webpack/webpack-dev-server/issues/100
    render (translationMessages, App)
  })
}
// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise (resolve => {
    resolve (import('intl'))
  })
    .then (() =>
      Promise.all ([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    )
    .then (() => render (translationMessages))
    .catch (err => {
      throw err
    })
} else {
  render (translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require ('offline-plugin/runtime').install ()
}
