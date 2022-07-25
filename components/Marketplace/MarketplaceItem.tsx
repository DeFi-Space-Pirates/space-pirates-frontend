import Image from 'next/image'
import { useState } from 'react'
import LoadingButton from '../layout/LoadingButton'

type MarketplaceItemProps = {}

const MarketplaceItem = (props: MarketplaceItemProps) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="card card-compact bg-base-200 drop-shadow-md xl:col-span-3 lg:col-span-4 sm:col-span-6 col-span-12">
      <Image
        alt="placeholderNFT"
        src="/placeholderNFT.jpg"
        layout="responsive"
        height={336}
        width={336}
      />
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title sm:text-xl text-base">
            Amazing NFT
            <span className="font-light sm:text-base text-sm">#123</span>
          </h2>
          <div className="flex items-center gap-x-1">
            <span className="font-semibold">10</span>
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
              alt="token"
              height={20}
              width={20}
            />
          </div>
        </div>
        <p className="font-light sm:text-base text-xs">Availability: 100</p>
        <p className="font-light sm:text-base text-xs">Max mint per user: 10</p>
        <div className="card-actions justify-between items-center">
          <p className="font-normal sm:text-base text-xs">
            Sales ends 27-10-2022
          </p>
          <div>
            <LoadingButton loading={loading} onClick={() => {}} text="MINT" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceItem
