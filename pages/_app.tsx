import '../styles/globals.css'
import "../lib/scss/App.scss"
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AppContextProvider from '../lib/context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <AppContextProvider>
			<div>

			<Script src="/assets/topbar/topbar.min.js" strategy="beforeInteractive" />

			<Script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js' strategy="beforeInteractive" />

			<Component {...pageProps} />
		</div>
	</AppContextProvider>
}

export default MyApp
