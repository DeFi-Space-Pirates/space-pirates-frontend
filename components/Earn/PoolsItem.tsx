import Image from 'next/image'
import { useState } from 'react'
import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'
import { Token1155 } from '../../typings/Token'
import LoadingButton from '../layout/LoadingButton'
import TokenInput from '../Trade/TokenInput'

type PoolsItemProps = {
  tokenA: Token1155
  tokenB: Token1155
}

const PoolsItem = ({ tokenA, tokenB }: PoolsItemProps) => {
  const [loading, setLoading] = useState(false)
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')

  const { toggleAlert } = useAlert()
  const { tronWeb } = useTronWeb()

  const handleAmountAChange = (amount: string) => {
    setAmountA(amount)
  }

  const handleAmountBChange = (amount: string) => {
    setAmountB(amount)
  }

  const onAddLiquidity = () => {
    setLoading(true)

    try {
      // const spacePiratesWrapper = await tronWeb.contract(
      // )
      // toggleAlert(
      //   `Successfully redeemed ${unWrapAmount} ${token!.symbol}`,
      //   'success',
      // )
    } catch (err) {
      toggleAlert('Error during adding liquidity. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="xl:col-span-4 md:col-span-6 col-span-12 card card-compact drop-shadow-lg bg-base-200 collapse collapse-arrow">
      <div className="card-body gap-y-5">
        <div className="relative">
          <div className="absolute">
            <Image
              src={tokenA.logoURI}
              alt={tokenA.name}
              height={25}
              width={25}
            />
          </div>
          <div className="absolute inset-3">
            <Image
              src={tokenB.logoURI}
              alt={tokenB.name}
              height={25}
              width={25}
            />
          </div>
          <p className="ml-14 font-semibold text-lg">AST-DBL</p>
        </div>
        <div>
          <p className="text-lg font-semibold">APR: 7%</p>
          <p className="text-lg font-semibold">Liquidity: $129.052.929</p>
        </div>
        {/* {someState ? (
          <>
            <div>
              <TokenInput
                amount={amountA}
                token={tokenA}
                handleAmountChange={handleAmountAChange}
              />
            </div>
            <div>
              <LoadingButton
                loading={loading}
                text="Remove liquidity"
                onClick={() => onAddLiquidity()}
              />
            </div>
          </>
        ) : (
          <> */}
        <div className="flex gap-4">
          <TokenInput
            amount={amountA}
            token={tokenA}
            handleAmountChange={handleAmountAChange}
          />
          <TokenInput
            amount={amountB}
            token={tokenB}
            handleAmountChange={handleAmountBChange}
          />
        </div>
        <div>
          <LoadingButton
            loading={loading}
            text="Add liquidity"
            onClick={() => onAddLiquidity()}
          />
        </div>
        {/* </>
        )} */}
      </div>
    </div>
  )
}
export default PoolsItem
