import '../styles/globals.css'
import "../lib/scss/App.scss"
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>

  		<Script src="/static/topbar/topbar.min.js" strategy="beforeInteractive" />

		<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/4.17.4/antd.min.css' integrity='sha512-MIam2KgzIIyxRmfAqAM8+3pvkqhSqtHQVjlFx9v3SwfNPXgB6OW/LHtjWlfj4r5AtgOlLdn2ip7Yb2ndyP7KEQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />

    	<Component {...pageProps} />
  	</div>
}

export default MyApp
