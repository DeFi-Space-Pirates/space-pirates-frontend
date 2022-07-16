import Image from 'next/image'
import { useState } from 'react'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'

type FaucetCardProps = {
  id: number
  name: string
  maxAmount: number
  onMintToken: (id: number, amount: number) => Promise<void>
}

const FaucetCard = ({ id, name, maxAmount, onMintToken }: FaucetCardProps) => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()

  const onSubmit = async () => {
    setLoading(true)
    try {
      await onMintToken(id, amount)
    } catch (err) {
      toggleAlert('Error during the mint. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card card-normal m-3 p-3 drop-shadow-lg bg-base-200">
      <div className="card-body items-center p-2">
        <div className="card-title justify-center">
          <Image
            src="/favicon.ico"
            className="rounded-xl"
            alt={name}
            width={25}
            height={25}
          />
          <p className="text-2xl font-bold">{name}</p>
        </div>
        <div className="form-control mb-8">
          <span className=" label label-text">Enter {name} amount</span>
          <label className="input-group drop-shadow-md">
            <input
              type="number"
              placeholder="0"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
            <span className="btn border-0 bg-neutral text-base-100">MAX</span>
          </label>
          <span className="label label-text font-bold">
            Max mintable amount {maxAmount}
          </span>
        </div>
        <LoadingButton
          text="MINT"
          loading={loading}
          onClick={() => onSubmit()}
        />
      </div>
    </div>
  )
}

export default FaucetCard
