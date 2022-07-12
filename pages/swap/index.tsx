import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import SwapCard from '../../components/Swap/SwapCard'
import TokensModal from '../../components/Swap/TokensModal'
import { NextPageWithLayout } from '../_app'

const Swap: NextPageWithLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Space Pirates Swap</title>
      </Head>
      <TokensModal />
      <SwapCard />
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
