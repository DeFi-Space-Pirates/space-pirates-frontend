import { useState } from 'react'
import Image from 'next/image'

import TokenInput from '../Trade/TokenInput'
import LoadingButton from '../layout/LoadingButton'

import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'
import { Pool } from '../../typings/Pools'
import { Token1155 } from '../../typings/Token'
import SpacePiratesRouter from '../../config/artifacts/SpacePiratesRouter.json'
import { addresses } from '../../config/addresses'
import { convertToHex, getUnixTimestamp } from '../../lib/tronweb'

type PoolsItemProps = {
  pool: Pool
}

const PoolsItem = ({
  pool: { tokenA, tokenB, reserveA, reserveB },
}: PoolsItemProps) => {
  const [loading, setLoading] = useState(false)
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')

  const { toggleAlert } = useAlert()
  const { tronWeb, address } = useTronWeb()

  const handleAmountAChange = (amount: string) => {
    setAmountA(amount)
  }

  const handleAmountBChange = (amount: string) => {
    setAmountB(amount)
  }

  const onAddLiquidity = async () => {
    setLoading(true)

    try {
      const spacePiratesRouter = await tronWeb.contract(
        SpacePiratesRouter.abi,
        addresses.shasta.routerContract,
      )

      await spacePiratesRouter
        .addLiquidity(
          tokenA.id,
          tokenB.id,
          convertToHex(amountA, 1e18),
          convertToHex(amountB, 1e18),
          convertToHex(amountA, 0.98 * 1e18),
          convertToHex(amountB, 0.98 * 1e18),
          address,
          getUnixTimestamp(300),
        )
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error while adding liquidity. Try again', 'error')
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
          <p className="text-lg font-semibold">
            Liquidity: {reserveA + reserveB}
          </p>
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
