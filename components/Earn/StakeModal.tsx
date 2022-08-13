import { useState } from 'react'
import { StakeModalData } from '../../typings/Staking'
import LoadingButton from '../layout/LoadingButton'
import TokenInput from '../Trade/TokenInput'

type StakeModalProps = {
  showModal: boolean
  handleShowModal: () => void
  modalData: StakeModalData
}

const StakeModal = ({
  showModal,
  handleShowModal,
  modalData: { text, token, onSubmit },
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
