import { useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import LoadingButton from '../../components/layout/LoadingButton'
import NavTab from '../../components/layout/NavTab'

import { useAlert } from '../../contexts/AlertContext'
import PoolsItem from '../../components/Earn/PoolsItem'

import DexTokensList from '../../config/constants/dexTokensList.json'
import SpacePiratesFactory from '../../config/artifacts/SpacePiratesFactory.json'
import SpacePiratesPair from '../../config/artifacts/SpacePiratesPair.json'

import { getTronWebInstance } from '../../lib/tronweb'
import { addresses } from '../../config/addresses'
import { Pool } from '../../typings/Pools'
import { getTokenById } from '../../lib/tokens'
import WIPBanner from '../../components/layout/WIPBanner'

export const getServerSideProps: GetServerSideProps<{
  pools: Pool[] //TODO define the Pair type
}> = async () => {
  const tronWeb = getTronWebInstance()
  const spacePiratesFactory = await tronWeb.contract(
    SpacePiratesFactory.abi,
    addresses.shasta.factoryContract,
  )

  const poolsAmount = await spacePiratesFactory.allPairsLength().call()

  const pools: Pool[] = []

  for (let i = 0; i < tronWeb.BigNumber(poolsAmount._hex).toNumber(); i++) {
    const pairAddress = await spacePiratesFactory.allPairs(i).call()

    const spacePiratesPair = await tronWeb.contract(
      SpacePiratesPair.abi,
      pairAddress,
    )

    const tokenIds = await spacePiratesPair.getTokenIds().call()
    const reserves = await spacePiratesPair.getReserves().call()

    //TODO fetch APR info

    pools.push({
      tokenA: getTokenById(
        tronWeb.BigNumber(tokenIds._token0._hex).toNumber(),
      )!,
      tokenB: getTokenById(
        tronWeb.BigNumber(tokenIds._token1._hex).toNumber(),
      )!,
      reserveA: tronWeb.BigNumber(reserves._reserve0._hex).toNumber(),
      reserveB: tronWeb.BigNumber(reserves._reserve1._hex).toNumber(),
    })
  }

  return {
    props: { pools },
  }
}

type PoolsProps = NextPageWithLayout &
  InferGetServerSidePropsType<typeof getServerSideProps>

const Pools = ({ pools }: PoolsProps) => {
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const onStakeLPTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb stake LP logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onUnStakeLPTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb unstake LP logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onHarvestLPTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb harvest LP logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

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
        {pools.map((pool, index) => (
          <PoolsItem key={index} pool={pool} />
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
