import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AlertProvider } from '../contexts/AlertContext'
import Layout from '../components/Layout'
import { TronWebProvider } from '../contexts/TronWebContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <TronWebProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TronWebProvider>
    </AlertProvider>
  )
}

export default MyApp
