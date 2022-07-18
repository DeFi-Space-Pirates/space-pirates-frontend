import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import LoadingButton from '../../components/layout/LoadingButton'
import NavTab from '../../components/layout/NavTab'

import { useAlert } from '../../contexts/AlertContext'

const Staking: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const onStakeTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb stake logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const onUnStakeTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb unstake logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const onHarvestTokens = async () => {
    setLoading(true)

    try {
      //TODO implement tronweb harvest logic
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full p-5 ">
      <Head>
        <title>Space Pirates Staking</title>
      </Head>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Space Pirates Staking</h1>
        <h2 className="text-3xl font-bold mb-2 pt-10">Vault</h2>
        <p className="text-xl italic">
          Do not let your tokens sit idle. Stake and earn!
        </p>
      </div>
      <div className="flex md:flex-col md:gap-y-7 md:items-center justify-around">
        <div className="md:w-11/12 bg-base-200 p-4 gap-y-4 md:gap-y-0 rounded-md drop-shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="relative">
            <div className="absolute">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="token"
                height={20}
                width={20}
              />
            </div>
            <div className="absolute inset-2">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                alt="token"
                height={25}
                width={25}
              />
            </div>
            <p className="ml-10 font-semibold text-lg">Stake DBL earn DBL</p>
          </div>
          <div>
            <p className="text-sm font-light">Earned</p>
            <p className="font-bold text-lg">0</p>
          </div>
          <div>
            <p className="text-sm font-light">APR</p>
            <p className="font-bold text-lg">18.5%</p>
          </div>
          <div>
            <p className="text-sm font-light">Total staked</p>
            <p className="font-bold text-lg">$129.052.929</p>
          </div>
          <div className="md:w-1/6">
            {/* {someState ? (
              <>
                <p className="text-center text-lg">
                  Staked: <span className="font-semibold">12.545</span>
                </p>
                <LoadingButton
                  loading={loading}
                  text={someState ? "HARVEST" : "UNSTAKE"}
                  onClick={() => someState ? onHarvestTokens() : onUnStakeTokens()}
                />
              </>
            ) : ( */}
            <LoadingButton
              loading={loading}
              text="STAKE"
              onClick={() => onStakeTokens()}
            />
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 pt-10">LP-Stake</h2>
        <p className="text-xl italic">
          Stake LP tokens to earn while providing liquidity
        </p>
      </div>
      <div className="flex md:flex-col md:gap-y-7 md:items-center justify-around">
        <div className="md:w-11/12 bg-base-200 p-4 gap-y-4 md:gap-y-0 rounded-md drop-shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="relative">
            <div className="absolute">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="token"
                height={20}
                width={20}
              />
            </div>
            <div className="absolute inset-2">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                alt="token"
                height={25}
                width={25}
              />
            </div>
            <p className="ml-10 font-semibold text-lg">DBL-AST LP</p>
          </div>
          <div>
            <p className="text-sm font-light">Earned</p>
            <p className="font-bold text-lg">0</p>
          </div>
          <div>
            <p className="text-sm font-light">APR</p>
            <p className="font-bold text-lg">18.5%</p>
          </div>
          <div>
            <p className="text-sm font-light">Total staked</p>
            <p className="font-bold text-lg">$129.052.929</p>
          </div>
          <div className="md:w-1/6">
            {/* {someState ? (
              <>
                <p className="text-center text-lg">
                  Staked: <span className="font-semibold">12.545</span>
                </p>
                <LoadingButton
                  loading={loading}
                  text={someState ? "HARVEST" : "UNSTAKE"}
                  onClick={() => someState ? onHarvestTokens() : onUnStakeTokens()}
                />
              </>
            ) : ( */}
            <LoadingButton
              loading={loading}
              text="STAKE"
              onClick={() => onStakeTokens()}
            />
            {/* )} */}
          </div>
        </div>
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
