import { useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'

import { useTronWeb } from '../../contexts/TronWebContext'
import { isToken } from '../../lib/tokens'
import { convertToHex, convertToNumber } from '../../lib/tronweb'
import { Token1155 } from '../../typings/Token'

type FaucetCardProps = {
  token: Token1155
  maxAmount: string
}

const FaucetCard = ({ token, maxAmount }: FaucetCardProps) => {
  const [amount, setAmount] = useState('')

  const {
    getContractInstance,
    getTokenBalance,
    tronWeb,
    fetchSPTokensBalances,
  } = useTronWeb()
  const { toggleAlert } = useAlert()

  const onMintToken = async (id: number, amount: string) => {
    try {
      const spacePiratesFaucet = await getContractInstance(
        'faucetContract',
        'faucetContract',
      )

      const mintAmount = isToken(id) ? convertToHex(amount, 1e18) : amount
      await spacePiratesFaucet.mintToken(id, mintAmount).send()

      await fetchSPTokensBalances()
    } catch (err) {
      toggleAlert('Error during the mint. Try again', 'error')
    }
  }

  const onGetMaxAmount = async () => {
    const maxMintable = tronWeb
      .BigNumber(convertToHex(maxAmount, token.decimals === 18 ? 1e18 : 1))
      .minus(
        convertToHex(getTokenBalance(token), token.decimals === 18 ? 1e18 : 1),
      )

    setAmount(maxMintable > 0 ? convertToNumber(maxMintable, token.id) : '0')
  }

  return (
    <div className="card card-normal m-3 p-3 drop-shadow-lg bg-base-200">
      <div className="card-body items-center p-2">
        <div className="card-title justify-center">
          <Image
            src={token.logoURI}
            className="rounded-xl"
            alt={token.symbol}
            width={25}
            height={25}
          />
          <p className="text-2xl font-bold">{token.name}</p>
        </div>
        <div className="form-control mb-8">
          <span className="label label-text">Enter {token.symbol} amount</span>
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
              onClick={() => onGetMaxAmount()}
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
          onClick={() => onMintToken(token.id, amount)}
          disabled={amount === '0'}
        />
      </div>
    </div>
  )
}

export default FaucetCard
