import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import TokenInput from '../Trade/TokenInput'
import LoadingButton from '../layout/LoadingButton'
import StakeModal from './StakeModal'

import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'
import { Pool } from '../../typings/Pools'
import {
  convertToHex,
  convertToNumber,
  getUnixTimestamp,
} from '../../lib/tronweb'
import { getAddress } from '../../config/addresses'
import PairContract from '../../config/artifacts/SpacePiratesPair.json'
import SpacePiratesPair from '../../config/artifacts/SpacePiratesPair.json'
import { Token20 } from '../../typings/Token'
import { getTokenById } from '../../lib/tokens'

type PoolsItemProps = {
  pair: Token20
}

const PoolsItem = ({ pair }: PoolsItemProps) => {
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')
  const [pool, setPool] = useState<Pool | undefined>(undefined)

  const [showModal, setShowModal] = useState(false)

  const { toggleAlert } = useAlert()
  const {
    tronWeb,
    getContractInstance,
    address,
    chain,
    getTokenBalance,
    fetchLPTokensBalances,
    isApprovedSP,
  } = useTronWeb()

  const fetchPool = useCallback(async () => {
    try {
      const spacePiratesPair = await tronWeb.contract(
        SpacePiratesPair.abi,
        pair.address,
      )

      const tokenIds = await spacePiratesPair.getTokenIds().call()
      const reserves = await spacePiratesPair.getReserves().call()

      //TODO fetch APR info

      setPool({
        lpToken: pair,
        tokenA: getTokenById(
          tronWeb.BigNumber(tokenIds._token0._hex).toNumber(),
        )!,
        tokenB: getTokenById(
          tronWeb.BigNumber(tokenIds._token1._hex).toNumber(),
        )!,
        reserveA: tronWeb.BigNumber(reserves._reserve0._hex).toNumber(),
        reserveB: tronWeb.BigNumber(reserves._reserve1._hex).toNumber(),
      })
    } catch (err) {
      toggleAlert('Error while fetching pool information. Try again.', 'error')
    }
  }, [pair, toggleAlert, tronWeb])

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }

  const handleAmountAChange = (amount: string) => {
    setAmountA(amount)
  }

  const handleAmountBChange = (amount: string) => {
    setAmountB(amount)
  }

  const onAddLiquidity = async () => {
    try {
      await isApprovedSP('routerContract')

      const spacePiratesRouter = await getContractInstance(
        'routerContract',
        'routerContract',
      )

      await spacePiratesRouter
        .addLiquidity(
          pool?.tokenA.id,
          pool?.tokenB.id,
          convertToHex(amountA, 1e18),
          convertToHex(amountB, 1e18),
          0,
          0,
          address,
          getUnixTimestamp(300),
        )
        .send()

      await fetchLPTokensBalances()
      await fetchPool()
    } catch (err) {
      toggleAlert('Error while adding liquidity. Try again', 'error')
    }
  }

  const onRemoveLiquidity = async (amount: string) => {
    try {
      const pairContract = await tronWeb.contract(
        PairContract.abi,
        pool?.lpToken.address,
      )

      await pairContract
        .approve(
          getAddress('routerContract', chain),
          convertToHex(amount, 1e18),
        )
        .send()

      const spacePiratesRouter = await getContractInstance(
        'routerContract',
        'routerContract',
      )

      await spacePiratesRouter
        .removeLiquidity(
          pool?.tokenA.id,
          pool?.tokenB.id,
          convertToHex(amount, 1e18),
          0,
          0,
          address,
          getUnixTimestamp(300),
        )
        .send()

      await fetchLPTokensBalances()
      await fetchPool()
    } catch (err) {
      toggleAlert('Error while adding liquidity. Try again', 'error')
    }
  }

  useEffect(() => {
    fetchPool()
  }, [fetchPool])

  return (
    <>
      {pool && (
        <StakeModal
          handleShowModal={handleShowModal}
          showModal={showModal}
          modalData={{
            text: `Remove liquidity for `,
            onSubmit: onRemoveLiquidity,
            token: pool.lpToken,
          }}
        />
      )}
      <div className="xl:col-span-4 md:col-span-6 col-span-12 card card-compact drop-shadow-lg bg-base-200 collapse collapse-arrow">
        {pool ? (
          <div className="card-body gap-y-5">
            <div className="relative">
              <div className="absolute">
                <Image
                  src={pool?.tokenA.logoURI}
                  alt={pool?.tokenA.name}
                  height={25}
                  width={25}
                />
              </div>
              <div className="absolute inset-3">
                <Image
                  src={pool?.tokenB.logoURI}
                  alt={pool?.tokenB.name}
                  height={25}
                  width={25}
                />
              </div>
              <p className="ml-14 font-bold text-xl">
                {pool?.lpToken.name}
                <span className="font-medium"> - APR: 7%</span>
              </p>
            </div>
            <div className="flex">
              <p className="text-base">
                Liquidity {pool?.tokenA.symbol}:{' '}
                {convertToNumber(pool?.reserveA.toString(), 1)}
              </p>
              <p className="text-base">
                Liquidity {pool?.tokenB.symbol}:{' '}
                {convertToNumber(pool?.reserveB.toString(), 1)}
              </p>
            </div>
            <div className="flex gap-4">
              <TokenInput
                amount={amountA}
                token={pool?.tokenA}
                handleAmountChange={handleAmountAChange}
              />
              <TokenInput
                amount={amountB}
                token={pool?.tokenB}
                handleAmountChange={handleAmountBChange}
              />
            </div>
            <div className="flex">
              <div className="w-full">
                <LoadingButton text="Add liquidity" onClick={onAddLiquidity} />
              </div>
              {getTokenBalance(pool?.lpToken) !== '0.00' && (
                <div className="w-full ml-3">
                  <LoadingButton
                    text="Remove liquidity"
                    onSyncClick={() => handleShowModal()}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 gap-5 sm:p-2">
            <div className="flex flex-1 flex-col gap-5">
              <div className="bg-gray-200 w-2/5 animate-pulse h-8 rounded-md"></div>
              <div className="flex gap-x-4">
                <div className="bg-gray-200 w-1/2 animate-pulse h-3 rounded-md"></div>
                <div className="bg-gray-200 w-1/2 animate-pulse h-3 rounded-md"></div>
              </div>
              <div className="flex gap-x-4">
                <div className="bg-gray-200 w-1/2 animate-pulse h-10 rounded-md"></div>
                <div className="bg-gray-200 w-1/2 animate-pulse h-10 rounded-md"></div>
              </div>
            </div>
            <div className="flex gap-x-4">
              <div className="bg-gray-200 w-1/2 h-6 animate-pulse rounded-md"></div>
              <div className="bg-gray-200 w-1/2 h-6 animate-pulse rounded-md"></div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default PoolsItem
