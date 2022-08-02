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
import {
  convertToHex,
  convertToNumber,
  getUnixTimestamp,
  NULL_ADDRESS,
} from '../../lib/tronweb'
import WIPBanner from '../../components/layout/WIPBanner'
import { getAddress } from '../../config/addresses'

const Swap: NextPageWithLayout = () => {
  const [tokenA, setTokenA] = useState<Token>(tokensList.tokens[0])
  const [tokenB, setTokenB] = useState<Token>(tokensList.tokens[1])
  const [amountA, setAmountA] = useState('0.0')
  const [amountB, setAmountB] = useState('0.0')
  const [loadingA, setLoadingA] = useState(false)
  const [loadingB, setLoadingB] = useState(false)

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()

  const [isTokenA, setIsTokenA] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const { tronWeb, address, getContractInstance, chain } = useTronWeb()
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
      const spacePiratesFactory = await getContractInstance(
        'factoryContract',
        'factoryContract',
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

    if (typingTimeout) clearTimeout(typingTimeout)

    setTypingTimeout(
      setTimeout(async () => {
        const amountB = await getExpectedOutput(amount, true)
        setAmountB(amountB)
        setLoadingB(false)
      }, 2000),
    )
  }

  const handleAmountBChange = async (amount: string) => {
    setAmountB(amount)
    setLoadingA(true)

    if (typingTimeout) clearTimeout(typingTimeout)

    setTypingTimeout(
      setTimeout(async () => {
        const amountA = await getExpectedOutput(amount, false)
        setAmountA(amountA)
        setLoadingA(false)
      }, 2000),
    )
  }

  const invertTokens = () => {
    setTokenA(tokenB)
    setTokenB(tokenA)
    setAmountA(amountB)
    setAmountB(amountA)
  }

  const getExpectedOutput = async (
    amount: string,
    isTokenA: boolean,
  ): Promise<string> => {
    try {
      const spacePiratesRouter = await getContractInstance(
        'routerContract',
        'routerContract',
      )

      const ids = isTokenA ? [tokenA.id, tokenB.id] : [tokenB.id, tokenA.id]

      const amountsOut = await spacePiratesRouter
        .getAmountsOut(convertToHex(amount, 1e18), ids)
        .call()

      return convertToNumber(
        tronWeb.BigNumber(amountsOut[isTokenA ? 1 : 0]._hex),
        isTokenA ? tokenB.id! : tokenA.id!,
      )
    } catch (err) {
      toggleAlert('Cannot calculate the output. Try again.', 'error')
      return '0.0'
    }
  }

  const onSwapTokens = async () => {
    setLoading(true)

    try {
      const spacePiratesTokens = await getContractInstance(
        'tokensContract',
        'tokensContract',
      )

      const isApproved = await spacePiratesTokens
        .isApprovedForAll(address, getAddress('routerContract', chain))
        .call()

      !isApproved &&
        (await spacePiratesTokens
          .setApprovalForAll(getAddress('routerContract', chain), true)
          .send())

      const spacePiratesRouter = await getContractInstance(
        'routerContract',
        'routerContract',
      )

      const res = await spacePiratesRouter
        .swapExactTokensForTokens(
          convertToHex(amountA, 1e18),
          1,
          [tokenA.id, tokenB.id],
          address,
          getUnixTimestamp(300), //300 is 5 minutes
        )
        .send({ shouldPollResponse: true })
    } catch (err) {
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
