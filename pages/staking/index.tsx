import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import StakingItem from '../../components/Earn/StakingItem'

import { getTronWebInstance } from '../../lib/tronweb'
import SpacePiratesStaking from '../../config/artifacts/SpacePiratesStaking.json'
import { addresses } from '../../config/addresses'
import WIPBanner from '../../components/layout/WIPBanner'

export const getStaticProps: GetStaticProps<{
  poolIds: number[]
}> = async () => {
  const tronWeb = getTronWebInstance()
  const spacePiratesStaking = await tronWeb.contract(
    SpacePiratesStaking.abi,
    addresses.shasta.stakingContract,
  )

  const poolAmount = await spacePiratesStaking.poolAmount().call()

  let poolIds = []

  for (let i = 0; i < tronWeb.BigNumber(poolAmount._hex).toNumber(); i++) {
    const id = await spacePiratesStaking.poolIds(i).call()
    poolIds.push(tronWeb.BigNumber(id._hex).toNumber())
  }

  return {
    props: { poolIds },
  }
}

type StakingProps = NextPageWithLayout &
  InferGetStaticPropsType<typeof getStaticProps>

const Staking = ({ poolIds }: StakingProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Staking</title>
      </Head>
      <WIPBanner />
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Vault</h2>
        <p className="text-xl italic">
          Do not let your tokens sit idle. Stake and earn DBL!
        </p>
      </div>
      <div className="flex flex-col items-center gap-y-8">
        {poolIds.map((id) => (
          <StakingItem key={id} poolId={id} />
        ))}
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
