import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import PoolsItem from '../../components/Earn/PoolsItem'

import dexPairsList from '../../config/constants/dexPairsList.json'

const Pools: NextPageWithLayout = () => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Pools</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Pools</p>
        <p className="text-xl italic">Provide liquidity to the dex</p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {dexPairsList.tokens.map((pair, index) => (
          <PoolsItem key={index} pair={pair} />
        ))}
      </div>
    </div>
  )
}

Pools.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="earn" />
      {page}
    </Layout>
  )
}

export default Pools
