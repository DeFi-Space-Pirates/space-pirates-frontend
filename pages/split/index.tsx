import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import { NextPageWithLayout } from '../_app'

const Split: NextPageWithLayout = () => {
  return (
    <div className="min-h-full">
      <Head>
        <title>Space Pirates Split</title>
      </Head>
      <p>ciao</p>
    </div>
  )
}

Split.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <TradeTab />
      {page}
    </Layout>
  )
}

export default Split
