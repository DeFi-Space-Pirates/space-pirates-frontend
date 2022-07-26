import { NextPage } from 'next'
import Head from 'next/head'
import MarketplaceItem from '../../components/Marketplace/MarketplaceItem'

type MarketplaceProps = {}

const Marketplace: NextPage = (props: MarketplaceProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Marketplace</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Marketplace</p>
        <p className="text-xl italic">Explore and mint the available NFTs!</p>
      </div>
      <div className="grid grid-cols-12 md:gap-5 gap-y-5 gap-x-2">
        <MarketplaceItem />
        <MarketplaceItem />
        <MarketplaceItem />
        <MarketplaceItem />
        <MarketplaceItem />
      </div>
    </div>
  )
}

export default Marketplace
