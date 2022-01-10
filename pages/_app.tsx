import '../styles/globals.css'
import "../lib/scss/App.scss"
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AppContextProvider from '../lib/context/AppContext'
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<AppContextProvider>
			<SnackbarProvider 
				maxSnack={7} 
				variant = "success" 
				anchorOrigin =  {{
    				vertical: 'bottom',
                    horizontal: 'center',
                }}
			>
				<div>

					<Script src="/assets/topbar/topbar.min.js" strategy="beforeInteractive" />

					<Script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js' strategy="beforeInteractive" />

					<Component {...pageProps} />
				</div>
			</SnackbarProvider>

		</AppContextProvider>
	)
}

export default MyApp
