import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import StakingItem from '../../components/Earn/StakingItem'

import { convertToNumber, getTronWebInstance } from '../../lib/tronweb'
import SpacePiratesStaking from '../../config/artifacts/SpacePiratesStaking.json'
import { addresses } from '../../config/addresses'
import { StakingPool } from '../../typings/Staking'

export const getStaticProps: GetStaticProps<{
  stakingPools: StakingPool[]
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

  let stakingPools: StakingPool[] = []

  for (const id of poolIds) {
    let stakingPool = await spacePiratesStaking.stakingPools(id).call()

    stakingPool.rewardTokenId = convertToNumber(
      stakingPool.rewardTokenId._hex,
      id,
    )
    stakingPool.rewardRate = tronWeb
      .BigNumber(stakingPool.rewardRate._hex)
      .toNumber()
    stakingPool.depositFee = tronWeb
      .BigNumber(stakingPool.depositFee._hex)
      .toNumber()
    stakingPool.lastUpdateTime = tronWeb
      .BigNumber(stakingPool.lastUpdateTime._hex)
      .toNumber()
    stakingPool.totalSupply = tronWeb
      .BigNumber(stakingPool.totalSupply._hex)
      .toNumber()
    stakingPool.accRewardPerShare = tronWeb
      .BigNumber(stakingPool.accRewardPerShare._hex)
      .toNumber()

    stakingPools.push({
      stakingTokenId: id,
      exists: stakingPool.exists,
      accRewardPerShare: stakingPool.accRewardPerShare,
      depositFee: stakingPool.depositFee,
      lastUpdateTime: stakingPool.lastUpdateTime,
      rewardRate: stakingPool.rewardRate,
      rewardTokenId: stakingPool.rewardTokenId,
      totalSupply: stakingPool.totalSupply,
    })
  }

  return {
    props: { stakingPools },
  }
}

type StakingProps = NextPageWithLayout &
  InferGetStaticPropsType<typeof getStaticProps>

const Staking = ({ stakingPools }: StakingProps) => {
  return (
    <div className="min-h-full p-5">
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
        {stakingPools.map((stakingPool) => (
          <StakingItem
            key={stakingPool.stakingTokenId}
            stakingPool={stakingPool}
          />
        ))}
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 pt-10">LP-Stake</h2>
        <p className="text-xl italic">
          Stake LP tokens to earn while providing liquidity
        </p>
      </div>
      <div className="flex md:flex-col md:gap-y-7 md:items-center justify-around">
        {/* <StakingItem title="DBL-ASTR LP" /> */}
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
