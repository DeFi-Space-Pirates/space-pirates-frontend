import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NextPageWithLayout } from '../_app'

import CardContainer from '../../components/Trade/CardContainer'
import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import LoadingButton from '../../components/layout/LoadingButton'
import InfoBanner from '../../components/layout/InfoBanner'

import { useAlert } from '../../contexts/AlertContext'

const Split: NextPageWithLayout = () => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const onSplitTokens = async () => {
    setLoading(true)

    //TODO validate tokens balance

    try {
      //TODO implement tronweb split logic
    } catch (err) {
      toggleAlert('Error during the split. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const onMergeTokens = async () => {
    setLoading(true)

    //TODO validate tokens balance

    try {
      //TODO implement tronweb split logic
    } catch (err) {
      toggleAlert('Error during the split. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Space Pirates Split</title>
      </Head>
      <CardContainer
        title="Split"
        subtitle="Split your ASTR into stk-ASTR and ve-ASTR"
      >
        <InfoBanner>
          <span className="text-left font-semibold">
            For each ASTR you will get 1 ve-ASTR and 1 stk-ASTR.
          </span>
          <span className="block">
            Read more about ve-ASTR and str-ASTR on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-11/12">
            <div className="input-group drop-shadow-md mb-10">
              <span className="gap-2">
                <Image
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                  alt="token"
                  height={20}
                  width={20}
                  layout="fixed"
                />
                ASTR
              </span>
              <input
                type="number"
                className="input md:input-md sm:input-md input-md w-full"
                value={amount}
                onChange={(e) => setAmount(e.target.valueAsNumber)}
              />
            </div>
            <div className="flex justify-between gap-x-2">
              <div>
                <LoadingButton
                  text="SPLIT"
                  loading={loading}
                  onClick={() => onSplitTokens()}
                />
              </div>
              <div>
                <LoadingButton
                  text={`REDEEM ${amount} ASTR`}
                  loading={loading}
                  onClick={() => onMergeTokens()}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  )
}

Split.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="trade" />
      {page}
    </Layout>
  )
}

export default Split
