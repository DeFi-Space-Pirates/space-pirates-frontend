import { useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'

import SpacePiratesFaucet from '../../config/artifacts/SpacePiratesFaucet.json'
import { addresses } from '../../config/addresses'
import { useTronWeb } from '../../contexts/TronWebContext'
import { isToken } from '../../lib/tokensType'
import { convertToHex } from '../../lib/tronweb'

type FaucetCardProps = {
  id: number
  name: string
  maxAmount: string
}

const FaucetCard = ({ id, name, maxAmount }: FaucetCardProps) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const { tronWeb, balances1155, getBalanceById } = useTronWeb()
  const { toggleAlert } = useAlert()

  const onMintToken = async (id: number, amount: string) => {
    setLoading(true)
    try {
      const spacePiratesFaucet = await tronWeb.contract(
        SpacePiratesFaucet.abi,
        addresses.shasta.faucetContract,
      )

      const mintAmount = isToken(id) ? convertToHex(amount, 1e18) : amount

      await spacePiratesFaucet
        .mintToken(id, mintAmount)
        .send({ shouldPollResponse: true })

      toggleAlert(`Successfully minted ${amount} ${name}`, 'success')
    } catch (err) {
      toggleAlert('Error during the mint. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onGetMaxAmount = async (id: number) => {
    const maxMintable = parseFloat(maxAmount) - parseFloat(getBalanceById(id))

    setAmount(maxMintable > 0 ? maxMintable.toString() : '0')
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
          <span className="label label-text">Enter {name} amount</span>
          <label className="input-group drop-shadow-md">
            <input
              type="number"
              placeholder="0"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span
              className="btn btn-ghost bg-base-100 border-0"
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
          disabled={amount === '0'}
        />
      </div>
    </div>
  )
}

export default FaucetCard
