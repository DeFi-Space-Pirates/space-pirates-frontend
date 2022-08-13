import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import PoolsItem from '../../components/Earn/PoolsItem'

import SpacePiratesPair from '../../config/artifacts/SpacePiratesPair.json'
import { getTronWebInstance } from '../../lib/tronweb'
import dexPairsList from '../../config/constants/dexPairsList.json'
import { Pool } from '../../typings/Pools'
import { getTokenById } from '../../lib/tokens'

export const getServerSideProps: GetServerSideProps<{
  pools: Pool[] //TODO define the Pair type
}> = async () => {
  const pools: Pool[] = []
  const tronWeb = getTronWebInstance()

  for (const pair of dexPairsList.tokens) {
    const spacePiratesPair = await tronWeb.contract(
      SpacePiratesPair.abi,
      pair.address,
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
