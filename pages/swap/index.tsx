import { useState } from 'react'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'

import { Token } from '../../typings/Token'
import tokensList from '../../config/constants/tokensList.json'

import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import TokensModal from '../../components/Swap/TokensModal'
import DoubleArrows from '../../components/icons/DoubleArrows'
import TokenInput from '../../components/Swap/TokenInput'
import { useAlert } from '../../contexts/AlertContext'
import CardContainer from '../../components/layout/CardContainer'

const Swap: NextPageWithLayout = () => {
  const [tokenA, setTokenA] = useState<Token>(tokensList.tokens[0])
  const [tokenB, setTokenB] = useState<Token>(tokensList.tokens[1])
  const [amountA, setAmountA] = useState('0.0')
  const [amountB, setAmountB] = useState('0.0')

  const [isTokenA, setIsTokenA] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const handleShowModal = (isTokenA?: boolean) => {
    setShowModal((prev) => !prev)
    isTokenA !== undefined && setIsTokenA(isTokenA)
  }

  const handleTokenChange = (token: Token) => {
    isTokenA ? setTokenA(token) : setTokenB(token)
    setShowModal(false)
  }

  const handleAmountAChange = (amount: string) => {
    setAmountA(amount)
  }
  const handleAmountBChange = (amount: string) => {
    setAmountB(amount)
  }

  const invertTokens = () => {
    setTokenA(tokenB)
    setTokenB(tokenA)
    setAmountA(amountB)
    setAmountB(amountA)
  }

  const onSwapTokens = async () => {
    setLoading(true)

    //TODO validate tokens balance

    try {
      //TODO implement tronweb swap logic
    } catch (err) {
      toggleAlert('Error during the swap. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Space Pirates Swap</title>
      </Head>
      <TokensModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleTokenChange={handleTokenChange}
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
        />
        <button
          className={`btn glass bg-primary hover:bg-primary-focus border-0 drop-shadow-md mt-8 ${
            loading && 'loading'
          }`}
          onClick={() => onSwapTokens()}
        >
          SWAP
        </button>
      </CardContainer>
    </div>
  )
}

Swap.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <TradeTab />
      {page}
    </Layout>
  )
}

export default Swap
