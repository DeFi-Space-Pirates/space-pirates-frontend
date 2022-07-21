import Image from 'next/image'
import ChevronDown from '../icons/ChevronDown'
import { Token } from '../../typings/Token'
import { useTronWeb } from '../../contexts/TronWebContext'

import checkRegex from '../../lib/checkRegex'

type TokenInputProps = {
  handleShowModal?: () => void
  amount: string
  handleAmountChange?: (amount: string) => void
  token: Token
}

const TokenInput = ({
  handleShowModal,
  amount,
  handleAmountChange,
  token,
}: TokenInputProps) => {
  const { getBalanceById, getBalanceByAddress } = useTronWeb()

  const handleGetBalance = (): string => {
    return 'id' in token
      ? getBalanceById(token.id)
      : getBalanceByAddress(token.address)
  }

  return (
    <div>
      <div>
        <button
          className="btn modal-button btn-ghost gap-2 mb-2"
          onClick={handleShowModal ? () => handleShowModal() : () => {}}
        >
          <Image src={token.logoURI} alt="token" height={20} width={20} />
          {token.symbol}
          {handleShowModal && <ChevronDown />}
        </button>
      </div>
      <div className="flex input-group-md drop-shadow-md">
        <input
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.0"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          className={`input input-md w-full rounded-l-md rounded-r-${
            handleAmountChange ? 'none' : 'md'
          }`}
          value={amount}
          onChange={
            handleAmountChange
              ? (e) => {
                  if (checkRegex(e.target.value))
                    handleAmountChange(e.target.value)
                }
              : () => {}
          }
        />
        {handleAmountChange && (
          <span
            className="btn btn-md btn-ghost bg-base-100 border-0 rounded-r-md rounded-l-none"
            onClick={() => handleAmountChange(handleGetBalance())}
          >
            MAX
          </span>
        )}
      </div>
      {handleAmountChange && (
        <label className="label">Balance: {handleGetBalance()}</label>
      )}
    </div>
  )
}

export default TokenInput
