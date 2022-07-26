import Image from 'next/image'
import { useState } from 'react'
import LoadingButton from '../layout/LoadingButton'

type QuestItemProps = {
  text: string
  claimable: boolean
  completed: boolean
}

const QuestItem = ({ text, claimable, completed }: QuestItemProps) => {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex justify-between items-center gap-x-2 first:pt-0 last:pb-0 sm:p-3 p-1 last:border-none border-b border-base-200">
      <p
        className={`md:text-lg text-xs font-semibold ${
          completed ? 'line-through' : ''
        }`}
      >
        {text}
      </p>
      <div className="">
        <LoadingButton
          customClasses="md:btn-md btn-xs"
          loading={loading}
          text={completed ? 'Completed' : ''}
          disabled={completed || !claimable}
          onClick={() => {}}
        >
          <span className="md:mr-2">Claim 1 ASTR</span>
          <div className={`hidden md:inline ${!claimable ? 'opacity-40' : ''}`}>
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
              alt="token"
              height={20}
              width={20}
            />
          </div>
        </LoadingButton>
      </div>
    </div>
  )
}

export default QuestItem
