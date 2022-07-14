import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AlertProvider } from '../contexts/AlertContext'
import Layout from '../components/layout/Layout'
import { TronWebProvider } from '../contexts/TronWebContext'
import { NextPage } from 'next'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <AlertProvider>
      <TronWebProvider>
        {getLayout(<Component {...pageProps} />)}
      </TronWebProvider>
    </AlertProvider>
  )
}

export default MyApp
