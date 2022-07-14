import { useState } from 'react'
import Head from 'next/head'
import { NextPageWithLayout } from '../_app'
import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import TokenInput from '../../components/Swap/TokenInput'
import TokensModal from '../../components/Swap/TokensModal'
import { useAlert } from '../../contexts/AlertContext'
import wrappedTokensList from '../../config/constants/wrappedTokensList.json'
import { Token } from '../../typings/Token'
import CardContainer from '../../components/layout/CardContainer'
import LoadingButton from '../../components/layout/LoadingButton'
import Link from 'next/link'
import InfoBanner from '../../components/layout/InfoBanner'

const Convert: NextPageWithLayout = () => {
  const [token, setToken] = useState(wrappedTokensList.tokens[0])
  const [amount, setAmount] = useState('')

  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const handleShowModal = (isTokenA?: boolean) => {
    setShowModal((prev) => !prev)
  }

  const handleTokenChange = (token: Token) => {
    setToken(token)
    setShowModal(false)
  }

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
  }

  const onConvertTokens = async () => {
    setLoading(true)

    //TODO validate tokens balance

    try {
      //TODO implement tronweb conversion logic
    } catch (err) {
      toggleAlert('Error during the conversion. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Space Pirates Convert</title>
      </Head>
      <TokensModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleTokenChange={handleTokenChange}
        tokensList={wrappedTokensList.tokens}
      />
      <CardContainer
        title="Convert"
        subtitle="Convert TRC20 tokens into their wrapped version"
      >
        <InfoBanner>
          <span className="text-left font-semibold">
            The conversion ratio is 1:1
          </span>
          <span className="block">
            Read more about wrapped tokens on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <TokenInput
          handleShowModal={() => handleShowModal(true)}
          amount={amount}
          handleAmountChange={handleAmountChange}
          token={token}
        />
        <LoadingButton
          text={`Convert in space${token.symbol}`}
          loading={loading}
          onClick={() => onConvertTokens()}
        />
      </CardContainer>
    </div>
  )
}

Convert.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <TradeTab />
      {page}
    </Layout>
  )
}

export default Convert
