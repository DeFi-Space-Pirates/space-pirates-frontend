import Image from 'next/image'
import { useState } from 'react'
import ShopItemModal from './ShopItemModal'

type ShopItemProps = {}

const ShopItem = (props: ShopItemProps) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      <ShopItemModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        // item={}
      />
      <div
        className="card card-compact bg-base-200 drop-shadow-md xl:col-span-2 sm:col-span-3 col-span-6"
        role="button"
        onClick={handleShowModal}
      >
        <Image
          alt="placeholderNFT"
          src="/logo.png"
          layout="responsive"
          height={720}
          width={1280}
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

export default ShopItem
