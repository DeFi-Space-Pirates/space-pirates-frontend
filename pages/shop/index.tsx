import { NextPage } from 'next'
import Head from 'next/head'
import ShopItem from '../../components/Shop/ShopItem'

type ShopProps = {}

const Shop: NextPage = (props: ShopProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Shop</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Shop</p>
        <p className="text-xl italic">Explore and mint the available NFTs!</p>
      </div>
      <div className="grid grid-cols-12 md:gap-5 gap-y-5 gap-x-2">
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
      </div>
    </div>
  )
}

export default Shop
