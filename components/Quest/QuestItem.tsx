import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getAddress } from '../../config/addresses'
import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'
import { getSignature } from '../../lib/quest'
import { getTokenById } from '../../lib/tokens'
import { convertToHex } from '../../lib/tronweb'
import { Quest } from '../../typings/Quest'
import LoadingButton from '../layout/LoadingButton'

type QuestItemProps = {
  quest: Quest
}

const QuestItem = ({ quest }: QuestItemProps) => {
  const [loading, setLoading] = useState(false)
  const [claimable, setClaimable] = useState(false)
  const [claimed, setClaimed] = useState(false)

  const { tronWeb, address, chain, getContractInstance } = useTronWeb()
  const { toggleAlert } = useAlert()

  useEffect(() => {
    const isClaimable = async () => {
      const claimable =
        quest.verifier === undefined
          ? true
          : await quest.verifier(address, chain)
      setClaimable(claimable)
    }

    const isClaimed = async () => {
      const events = await tronWeb.getEventResult(
        getAddress('faucetContract', chain),
        {
          sinceTimestamp: 0,
          eventName: 'TokenMint',
          onlyConfirm: true,
        },
      )

      const claimed = events.some(
        (event: { result: { receiver: string; questName: string } }) =>
          event.result.questName === quest.questName &&
          tronWeb.defaultAddress?.hex.replace(/^.{2}/g, '0x'),
      )

      setClaimed(claimed)
    }

    isClaimable()
    tronWeb && isClaimed()
  }, [tronWeb, address, chain, quest])

  const onClaimQuest = async () => {
    setLoading(true)

    try {
      const questContract = await getContractInstance(
        'questRedeemContract',
        'questRedeemContract',
      )

      const amounts = quest.amounts.map((amount) =>
        convertToHex(amount.toString(), 1e18),
      )

      const signature = await getSignature(tronWeb.defaultAddress?.hex!, quest)

      await questContract
        .claimQuest(quest.questName, quest.ids, amounts, signature)
        .send()
    } catch (err) {
      toggleAlert('Error while claiming quest. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-between items-center gap-x-2 first:pt-0 last:pb-0 sm:p-3 p-1 last:border-none border-b border-base-200">
      <p
        className={`md:text-lg text-xs font-semibold ${
          claimed ? 'line-through' : ''
        }`}
      >
        {quest.questName}
      </p>
      <div className="">
        <LoadingButton
          customClasses="md:btn-md btn-xs"
          loading={loading}
          text={claimed ? 'Claimed' : ''}
          disabled={claimed || !claimable}
          onClick={() => onClaimQuest()}
        >
          <span className="md:mr-2">
            Claim {quest.amounts[0]} {getTokenById(quest.ids[0])?.symbol}
          </span>
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
