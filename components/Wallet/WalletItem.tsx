import Image from 'next/image'
import tokensList from '../../config/constants/tokensList.json'
import wrappedTokensList from '../../config/constants/wrappedTokensList.json'
import { useTronWeb } from '../../contexts/TronWebContext'

type WalletItemProps = {
  tabIndex: number
  title: string
  predicate?: (id: number) => boolean
}

const WalletItem = ({ tabIndex, title, predicate }: WalletItemProps) => {
  const { getBalanceById, getBalanceByAddress } = useTronWeb()

  let tokens = predicate
    ? tokensList.tokens.filter((token) => predicate(token.id))
    : wrappedTokensList.unWrapped

  return (
    <div
      tabIndex={tabIndex}
      className="lg:w-3/6 md:w-4/6 w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content ">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="py-2 gap-y-4 md:gap-y-0 rounded-md drop-shadow-md flex flex-row justify-between items-center"
          >
            <div className="flex items-center">
              <Image
                src={token.logoURI}
                alt={token.name}
                height={20}
                width={20}
                layout="fixed"
              />
              <p className="ml-2 font-semibold md:text-lg">
                {token.name} {token.symbol.length > 0 && `(${token.symbol})`}
              </p>
            </div>
            <div>
              {'id' in token
                ? getBalanceById(token.id)
                : getBalanceByAddress(token.address)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WalletItem
