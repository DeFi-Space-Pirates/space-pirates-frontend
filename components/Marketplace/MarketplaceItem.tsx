import Image from 'next/image'
import { useState } from 'react'
import LoadingButton from '../layout/LoadingButton'
import MarketplaceItemModal from './MarketplaceItemModal'

type MarketplaceItemProps = {}

const MarketplaceItem = (props: MarketplaceItemProps) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <MarketplaceItemModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        // item={}
      />
      <div
        className="card card-compact bg-base-200 drop-shadow-md lg:col-span-3 sm:col-span-4 col-span-6"
        role="button"
        onClick={handleShowModal}
      >
        <Image
          alt="placeholderNFT"
          src="/placeholderNFT.jpg"
          layout="responsive"
          height={336}
          width={336}
        />
        <div className="card-body items-center">
          <h2 className="card-title sm:text-xl text-base">
            <span className="font-semibold">10 ASTR</span>
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
              alt="token"
              height={20}
              width={20}
            />
          </h2>
        </div>
      </div>
    </>
  )
}

export default MarketplaceItem
