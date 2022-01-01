import '../styles/globals.css'
import "../lib/scss/App.scss"
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AppContextProvider from '../lib/context/AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return <AppContextProvider>
			<div>

			<Script src="/assets/topbar/topbar.min.js" strategy="beforeInteractive" />


			<Script src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js' strategy="beforeInteractive" onLoad={e=>{
				let topbarColor = "#29d"; 

				topbar.config({
					autoRun      : true,
					barThickness : 3,
					barColors    : {
						'0'      : topbarColor,
						'.25'    : topbarColor,
						'.50'    : topbarColor,
						'.75'    : topbarColor,
						'1.0'    : topbarColor
					},
					shadowBlur   : 10,
					shadowColor  : 'rgba(0,   0,   0,   .6)',
					className    : 'app-topbar'
				});
			}} />

			<Component {...pageProps} />
		</div>
	</AppContextProvider>
}

export default MyApp
