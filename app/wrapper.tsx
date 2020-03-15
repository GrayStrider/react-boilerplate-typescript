import {FC, default as React} from 'react'
import {translationMessages} from '@/translations/i18n'
import {Provider} from 'react-redux'
import LanguageProvider from '@/containers/LanguageProvider'
import {ConnectedRouter} from 'connected-react-router'
import history from '@/utils/history'
import {store} from '@/store'

const AppWrapper: FC<{ messages?: any, Component?: FC }> =
	({
		 messages = translationMessages,
		 Component = require ('./containers/App').default,
	 }) =>
		<Provider store={store} >
			<LanguageProvider messages={messages} >
				<ConnectedRouter history={history} >
					<Component />
				</ConnectedRouter >
			</LanguageProvider >
		</Provider >

export default AppWrapper
