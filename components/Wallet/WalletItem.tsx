import Image from 'next/image'
import tokensList from '../../config/constants/tokensList.json'
import { useTronWeb } from '../../contexts/TronWebContext'

type WalletItemProps = {
  tabIndex: number
  title: string
  predicate: (id: number) => boolean
}

const WalletItem = ({ tabIndex, title, predicate }: WalletItemProps) => {
  const { balances } = useTronWeb()

  return (
    <div
      tabIndex={tabIndex}
      className="lg:w-3/6 md:w-4/6 w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content ">
        {tokensList.tokens.map(
          (token) =>
            predicate(token.id) && (
              <div className="py-2 gap-y-4 md:gap-y-0 rounded-md drop-shadow-md flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <Image
                    src={token.logoURI}
                    alt={token.name}
                    height={20}
                    width={20}
                    layout="fixed"
                  />
                  <p className="ml-2 font-semibold md:text-lg">
                    {token.name}{' '}
                    {token.symbol.length > 0 && `(${token.symbol})`}
                  </p>
                </div>
                <div>
                  {balances?.find((balance) => balance.id === token.id)?.amount}
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  )
}

export default WalletItem
