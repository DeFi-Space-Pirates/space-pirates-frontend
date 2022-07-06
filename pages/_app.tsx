import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AlertProvider } from '../contexts/AlertContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AlertProvider>
  )
}

export default MyApp
