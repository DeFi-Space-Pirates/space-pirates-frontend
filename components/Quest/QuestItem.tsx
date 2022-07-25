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
          text={completed ? 'Completed' : 'Claim'}
          disabled={completed || !claimable}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export default QuestItem
