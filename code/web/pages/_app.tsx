import '../styles/globals.css'
import type { AppProps } from 'next/app'
import PlausibleProvider from 'next-plausible'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider 
      domain="quest.joinpickup.com" 
      selfHosted={true} 
      customDomain="analytics.joinpickup.com"
    >
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}
