import Image from 'next/image'
import { useState } from 'react'
import { getTokenById } from '../../lib/tokens'
import { StakeModalData } from '../../typings/Staking'
import { Token1155 } from '../../typings/Token'
import LoadingButton from '../layout/LoadingButton'
import TokenInput from '../Trade/TokenInput'

type StakeModalProps = {
  showModal: boolean
  handleShowModal: () => void
  modalData: StakeModalData
  loading: boolean
}

const StakeModal = ({
  showModal,
  handleShowModal,
  modalData: { text, token, onSubmit },
  loading,
}: StakeModalProps) => {
  const [amount, setAmount] = useState('')

  const handleAmountChange = (amount: string) => {
    setAmount(amount)
  }

  return (
    <>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div
        className="modal modal-bottom sm:modal-middle"
        onClick={() => handleShowModal()}
      >
        <div
          className="modal-box bg-base-100"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className="flex flex-col gap-y-4">
            <h3 className="font-bold text-xl text-center">
              {text} {token?.symbol}
            </h3>
            <TokenInput
              amount={amount}
              handleAmountChange={handleAmountChange}
              token={token}
            />
            <LoadingButton
              loading={loading}
              onClick={() => onSubmit(amount)}
              text={`${text} ${amount} ${token?.symbol}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StakeModal
