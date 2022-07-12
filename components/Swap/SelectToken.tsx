import Image from 'next/image'
import ChevronDown from '../icons/ChevronDown'

type SelectTokenProps = {}

const SelectToken = (props: SelectTokenProps) => {
  return (
    <div>
      <div>
        <label
          htmlFor="swap-modal"
          className="btn modal-button btn-ghost gap-2 mb-2"
        >
          <Image src="/favicon.ico" alt="token" height={20} width={20} />
          token name
          <ChevronDown />
        </label>
      </div>
      <input
        type="decimal"
        placeholder="0.0"
        className="input input-lg w-full shadow-md"
      />
    </div>
  )
}

export default SelectToken
