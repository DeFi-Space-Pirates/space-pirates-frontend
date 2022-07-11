import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import { NextPageWithLayout } from '../_app'

const Swap: NextPageWithLayout = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Space Pirates Swap</title>
      </Head>
      <p>ciao</p>
    </div>
  )
}

Swap.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <TradeTab />
      {page}
    </Layout>
  )
}

export default Swap
