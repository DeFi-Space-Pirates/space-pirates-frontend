import Image from 'next/image'
import { useState } from 'react'

type FaucetCardProps = {
  id: number
  name: string
  maxAmount: number
  onMintToken: (id: number, amount: number) => void
}

const FaucetCard = ({ id, name, maxAmount, onMintToken }: FaucetCardProps) => {
  const [amount, setAmount] = useState(0)

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
          <p className="text-2xl font-bold text-accent">{name}</p>
        </div>
        <div className="form-control">
          <span className=" label label-text text-white">
            Enter {name} amount
          </span>
          <label className="input-group drop-shadow-md">
            <input
              type="number"
              placeholder="0"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.valueAsNumber)}
            />
            <span className="btn border-0 text-white bg-accent hover:bg-accent-focus">
              MAX
            </span>
          </label>
          <span className="label label-text text-gray-200 font-bold">
            Max mintable amount {maxAmount}
          </span>
        </div>
        <button
          className="btn btn-block glass bg-primary hover:bg-primary-focus border-0 drop-shadow-md mt-3"
          onClick={() => onMintToken(id, amount)}
        >
          MINT
        </button>
      </div>
    </div>
  )
}

export default FaucetCard
