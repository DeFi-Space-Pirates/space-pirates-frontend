import Image from 'next/image'
import { Token } from '../../typings/Token'

type TokenOutputProps = {
  amount: string
  token: Token
}

const TokenOutput = ({
  amount,

  token,
}: TokenOutputProps) => {
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
        readOnly
        placeholder="0.0"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        className="input input-lg w-full shadow-md"
        value={amount}
      />
    </div>
  )
}

export default TokenOutput
