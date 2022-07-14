import Image from 'next/image'
import ChevronDown from '../icons/ChevronDown'
import { Token } from '../../typings/Token'

type TokenInputProps = {
  handleShowModal: () => void
  amount: string
  handleAmountChange: (amount: string) => void
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
          onClick={() => handleShowModal()}
        >
          <Image src={token.logoURI} alt="token" height={20} width={20} />
          {token.symbol}
          <ChevronDown />
        </button>
      </div>
      <input
        type="text"
        placeholder="0.0"
        className="input input-lg w-full shadow-md"
        value={amount}
        onChange={(e) => handleAmountChange(e.target.value)}
      />
    </div>
  )
}

export default TokenInput
