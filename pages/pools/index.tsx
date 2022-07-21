import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import LoadingButton from '../../components/layout/LoadingButton'
import NavTab from '../../components/layout/NavTab'

import { useAlert } from '../../contexts/AlertContext'
import PoolsItem from '../../components/Earn/PoolsItem'

import DexTokensList from '../../config/constants/dexTokensList.json'

const Pools: NextPageWithLayout = () => {
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
        <PoolsItem
          tokenA={DexTokensList.tokens[0]}
          tokenB={DexTokensList.tokens[1]}
        />
        <PoolsItem
          tokenA={DexTokensList.tokens[0]}
          tokenB={DexTokensList.tokens[1]}
        />

        <PoolsItem
          tokenA={DexTokensList.tokens[0]}
          tokenB={DexTokensList.tokens[1]}
        />
        <PoolsItem
          tokenA={DexTokensList.tokens[0]}
          tokenB={DexTokensList.tokens[1]}
        />
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
