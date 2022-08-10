import Image from 'next/image'
import tokensList from '../../config/constants/tokensList.json'
import wrappedTokensList from '../../config/constants/wrappedTokensList.json'
import { useTronWeb } from '../../contexts/TronWebContext'

type WalletItemProps = {
  title: string
  predicate?: (id: number) => boolean
  lp?: boolean
}

const WalletItem = ({ title, predicate, lp }: WalletItemProps) => {
  const { getBalanceById, getBalanceByAddress, balancesLP } = useTronWeb()

  let tokens = predicate
    ? tokensList.tokens.filter((token) => predicate(token.id))
    : lp
    ? balancesLP!
    : wrappedTokensList.unWrapped

  return (
    <div className="lg:w-3/6 md:w-4/6 w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box drop-shadow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content ">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="py-2 gap-y-4 md:gap-y-0 rounded-md drop-shadow-md flex flex-row justify-between items-center"
          >
            <div className="flex items-center">
              <Image
                src={'logoURI' in token ? token.logoURI : '/favicon.ico'}
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
              {'balance' in token
                ? token.balance
                : 'id' in token
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
