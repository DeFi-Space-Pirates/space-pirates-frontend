import Image from 'next/image'
import ChevronDown from '../icons/ChevronDown'
import { Token } from '../../typings/Token'

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
        className="input input-lg w-full shadow-md"
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
    </div>
  )
}

export default TokenInput
