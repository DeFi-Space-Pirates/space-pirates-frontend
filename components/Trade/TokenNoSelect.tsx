import Image from 'next/image'
import { Token } from '../../typings/Token'

import checkRegex from '../../lib/checkRegex'

type TokenNotSelectProps = {
  amount: string
  handleAmountChange: (amount: string) => void
  token: Token
}

const TokenNotSelect = ({
  amount,
  handleAmountChange,
  token,
}: TokenNotSelectProps) => {
  return (
    <div>
      <div>
        <button className="btn modal-button btn-ghost gap-2 mb-2">
          <Image src={token.logoURI} alt="token" height={20} width={20} />
          {token.symbol}
        </button>
      </div>
      <input
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        placeholder="0.0"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        className="input input-lg w-full shadow-md"
        value={amount}
        onChange={(e) => {
          if (checkRegex(e.target.value)) handleAmountChange(e.target.value)
        }}
      />
    </div>
  )
}

export default TokenNotSelect
