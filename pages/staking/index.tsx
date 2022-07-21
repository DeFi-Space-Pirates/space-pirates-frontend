import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'

import StakingItem from '../../components/Earn/StakingItem'

const Staking: NextPageWithLayout = () => {
  return (
    <div className="min-h-full p-5 ">
      <Head>
        <title>Space Pirates Staking</title>
      </Head>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Space Pirates Staking</h1>
        <h2 className="text-3xl font-bold mb-2 pt-10">Vault</h2>
        <p className="text-xl italic">
          Do not let your tokens sit idle. Stake and earn DBL!
        </p>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <StakingItem title="Stake DBL" />
        <StakingItem title="Stake ASTR" />
        <StakingItem title="Stake stkASTR" />
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 pt-10">LP-Stake</h2>
        <p className="text-xl italic">
          Stake LP tokens to earn while providing liquidity
        </p>
      </div>
      <div className="flex md:flex-col md:gap-y-7 md:items-center justify-around">
        <StakingItem title="DBL-ASTR LP" />
      </div>
    </div>
  )
}

Staking.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="earn" />
      {page}
    </Layout>
  )
}

export default Staking
