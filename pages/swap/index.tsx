import { useState } from 'react'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import TokensModal from '../../components/Trade/TokensModal'
import DoubleArrows from '../../components/icons/DoubleArrows'
import TokenInput from '../../components/Trade/TokenInput'
import CardContainer from '../../components/Trade/CardContainer'
import LoadingButton from '../../components/layout/LoadingButton'

import { Token } from '../../typings/Token'
import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'
import tokensList from '../../config/constants/dexTokensList.json'
import SpacePiratesFactory from '../../config/artifacts/SpacePiratesFactory.json'
import SpacePiratesRouter from '../../config/artifacts/SpacePiratesRouter.json'
import StaticRouterAbi from '../../config/artifacts/StaticRouterAbi.json'
import { addresses } from '../../config/addresses'
import {
  convertToHex,
  convertToNumber,
  getUnixTimestamp,
  NULL_ADDRESS,
} from '../../lib/tronweb'

const Swap: NextPageWithLayout = () => {
  const [tokenA, setTokenA] = useState<Token>(tokensList.tokens[0])
  const [tokenB, setTokenB] = useState<Token>(tokensList.tokens[1])
  const [amountA, setAmountA] = useState('0.0')
  const [amountB, setAmountB] = useState('0.0')
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)

  const [isTokenA, setIsTokenA] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const { tronWeb, address } = useTronWeb()
  const { toggleAlert } = useAlert()

  const handleShowModal = (isTokenA?: boolean) => {
    setShowModal((prev) => !prev)
    isTokenA !== undefined && setIsTokenA(isTokenA)
  }

  const handleTokenChange = async (token: Token) => {
    if (isTokenA) {
      const valid = await isValidPair(token, tokenB)
      if (valid) {
        if (token === tokenB) {
          setTokenB(tokenA)
        }

        setTokenA(token)
      }
    } else {
      const valid = await isValidPair(tokenA, token)
      if (valid) {
        if (token === tokenA) {
          setTokenA(tokenB)
        }
        setTokenB(token)
      }
    }

    setShowModal(false)
  }

  const isValidPair = async (
    tokenA: Token,
    tokenB: Token,
  ): Promise<boolean> => {
    try {
      const spacePiratesFactory = await tronWeb.contract(
        SpacePiratesFactory.abi,
        addresses.shasta.factoryContract,
      )

      const pair = await spacePiratesFactory
        .getPair(tokenA.id, tokenB.id)
        .call()

      if (pair === NULL_ADDRESS) {
        toggleAlert('Invalid pair. Try a different combination.', 'error')
        return false
      }

      return true
    } catch (error) {
      toggleAlert('Invalid pair. Try a different combination.', 'error')
      return false
    }
  }

  const handleAmountAChange = async (amount: string) => {
    setAmountA(amount)

    setLoadingB(true)

    setTimeout(async () => {
      const amountB = await getExpectedOutput(amount)
      setAmountB('amountB')
      setLoadingB(false)
    }, 2000)
  }

  const handleAmountBChange = async (amount: string) => {
    setAmountB(amount)
    setLoadingA(true)

    setTimeout(async () => {
      const amountA = await getExpectedOutput(amount)
      setAmountA(amountA)
      setLoadingA(false)
    }, 2000)
  }

  const invertTokens = () => {
    setTokenA(tokenB)
    setTokenB(tokenA)
    setAmountA(amountB)
    setAmountB(amountA)
  }

  //TODO: try again after liquidity added to the pool
  const getExpectedOutput = async (amount: string): Promise<string> => {
    try {
      const spacePiratesRouterStatic = await tronWeb.contract(
        StaticRouterAbi,
        addresses.shasta.routerContract,
      )

      const res = await spacePiratesRouterStatic
        .swapExactTokensForTokens(
          convertToHex(amount, 1e18),
          convertToHex(amount, 0.98 * 1e18),
          [tokenA.id, tokenB.id],
          address,
          getUnixTimestamp(300), //300 is 5 minutes
        )
        .call()

      console.log(res)

      return convertToNumber(res._hex, 1e18)
    } catch (err) {
      console.log(err)
      toggleAlert('Cannot calculate the output. Try again.', 'error')
      return '0.0'
    }
  }

  //TODO: try again after liquidity added to the pool
  const onSwapTokens = async () => {
    setLoading(true)

    try {
      const spacePiratesRouter = await tronWeb.contract(
        SpacePiratesRouter.abi,
        addresses.shasta.routerContract,
      )

      const res = await spacePiratesRouter
        .swapExactTokensForTokens(
          convertToHex(amountA, 1e18),
          convertToHex(amountA, 0.98 * 1e18),
          [tokenA.id, tokenB.id],
          address,
          getUnixTimestamp(300), //300 is 5 minutes
        )
        .send({ shouldPollResponse: true })

      console.log(res)
    } catch (err) {
      console.log(err)
      toggleAlert('Error during the swap. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center py-20">
      <Head>
        <title>Space Pirates Swap</title>
      </Head>
      <TokensModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleTokenChange={handleTokenChange}
        tokensList={tokensList.tokens}
      />
      <CardContainer
        title="Swap"
        subtitle="Swap instantly Space Pirates tokens"
      >
        <TokenInput
          handleShowModal={() => handleShowModal(true)}
          amount={amountA}
          handleAmountChange={handleAmountAChange}
          token={tokenA}
          loading={loadingA}
        />
        <div className="flex justify-center">
          <button
            className="btn btn-circle btn-outline border-0 my-4"
            onClick={() => invertTokens()}
          >
            <DoubleArrows />
          </button>
        </div>
        <TokenInput
          handleShowModal={() => handleShowModal(false)}
          amount={amountB}
          handleAmountChange={handleAmountBChange}
          token={tokenB}
          loading={loadingB}
        />
        <div className="mt-8 text-center">
          <LoadingButton
            text="SWAP"
            loading={loading}
            onClick={() => onSwapTokens()}
          />
          <small>Default slippage: 2%</small>
        </div>
      </CardContainer>
    </div>
  )
}

Swap.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="trade" />
      {page}
    </Layout>
  )
}

export default Swap
