import { useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'

import SpacePiratesFaucet from '../../config/artifacts/SpacePiratesFaucet.json'
import { addresses } from '../../config/addresses'
import { useTronWeb } from '../../contexts/TronWebContext'

type FaucetCardProps = {
  id: number
  name: string
  maxAmount: number
}

const FaucetCard = ({ id, name, maxAmount }: FaucetCardProps) => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)

  const { tronWeb } = useTronWeb()
  const { toggleAlert } = useAlert()

  const onMintToken = async (id: number, amount: number) => {
    setLoading(true)
    try {
      const spacePiratesFaucet = await tronWeb.contract(
        SpacePiratesFaucet.abi,
        addresses.shasta.faucetContract,
      )

      if (id === 1) {
        await spacePiratesFaucet.mintDoubloons(amount).send()
      } else if (id === 2) {
        await spacePiratesFaucet.mintAsteroids(amount).send()
      }
    } catch (err) {
      toggleAlert('Error during the mint. Try again', 'danger')
    } finally {
      setLoading(false)
    }
  }

  const onGetMaxAmount = async (id: number) => {
    const spacePiratesFaucet = await tronWeb.contract(
      SpacePiratesFaucet.abi,
      addresses.shasta.faucetContract,
    )

    if (id === 1) {
      const minted = await spacePiratesFaucet
        .mintedDoubloons(tronWeb.defaultAccount)
        .call()
      setAmount(maxAmount - minted)
    } else if (id === 2) {
      const minted = await spacePiratesFaucet
        .mintedAsteroids(tronWeb.defaultAccount)
        .call()
      setAmount(maxAmount - minted)
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
            <span
              className="btn border-0 bg-neutral text-base-100"
              onClick={() => onGetMaxAmount(id)}
            >
              MAX
            </span>
          </label>
          <span className="label label-text font-bold">
            Max mintable amount {maxAmount}
          </span>
        </div>
        <LoadingButton
          text="MINT"
          loading={loading}
          onClick={() => onMintToken(id, amount)}
          disabled={amount === 0}
        />
      </div>
    </div>
  )
}

export default FaucetCard
