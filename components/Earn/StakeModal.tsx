import Image from 'next/image'
import { useState } from 'react'
import { getTokenById } from '../../lib/tokens'
import LoadingButton from '../layout/LoadingButton'
import TokenInput from '../Trade/TokenInput'

type StakeModalProps = {
  showModal: boolean
  handleShowModal: () => void
}

const StakeModal = ({ showModal, handleShowModal }: StakeModalProps) => {
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
            <h3 className="font-bold text-xl text-center">Stake DBL</h3>
            <TokenInput
              amount={amount}
              handleAmountChange={handleAmountChange}
              token={getTokenById(1)!}
            />
            <LoadingButton
              loading={false}
              onClick={() => {}}
              text="Stake DBL"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StakeModal
