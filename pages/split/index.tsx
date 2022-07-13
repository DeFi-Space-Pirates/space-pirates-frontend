import Head from 'next/head'
import Image from 'next/image'
import DoubleArrows from '../../components/icons/DoubleArrows'
import CardContainer from '../../components/layout/CardContainer'
import Layout from '../../components/layout/Layout'
import TradeTab from '../../components/layout/TradeTab'
import { NextPageWithLayout } from '../_app'

const Split: NextPageWithLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Head>
        <title>Space Pirates Split</title>
      </Head>
      <CardContainer
        title="Split"
        subtitle="Split your Asteroids into stk-Asteroids and ve-Asteroids"
      >
        <div className="input-group justify-center">
          <span className="gap-2">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
              alt="token"
              height={25}
              width={25}
            />
            BTC
          </span>
          <input
            type="text"
            placeholder="0.0"
            className="input input-lg w-3/4 shadow-md"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-circle btn-outline border-0 my-4"
            // onClick={() => invertTokens()}
          >
            <DoubleArrows />
          </button>
        </div>
        <div className="flex justify-between gap-3">
          <div className="input-group">
            <span className="gap-2">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="token"
                height={25}
                width={25}
              />
              BTC
            </span>
            <input
              type="text"
              placeholder="0.0"
              className="input input-lg w-fit shadow-md"
            />
          </div>
          <div className="input-group">
            <span className="gap-2">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="token"
                height={25}
                width={25}
              />
              BTC
            </span>
            <input
              type="text"
              placeholder="0.0"
              className="input input-lg w-fit shadow-md"
            />
          </div>
        </div>
      </CardContainer>
    </div>
  )
}

Split.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <TradeTab />
      {page}
    </Layout>
  )
}

export default Split
