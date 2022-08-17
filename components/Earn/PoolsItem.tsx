import { useState } from 'react'
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

type PoolsItemProps = {
  pool: Pool
}

const PoolsItem = ({
  pool: { lpToken, tokenA, tokenB, reserveA, reserveB },
}: PoolsItemProps) => {
  const [amountA, setAmountA] = useState('')
  const [amountB, setAmountB] = useState('')

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
          tokenA.id,
          tokenB.id,
          convertToHex(amountA, 1e18),
          convertToHex(amountB, 1e18),
          0,
          0,
          address,
          getUnixTimestamp(300),
        )
        .send()

      await fetchLPTokensBalances()
    } catch (err) {
      toggleAlert('Error while adding liquidity. Try again', 'error')
    }
  }

  const onRemoveLiquidity = async (amount: string) => {
    try {
      const pairContract = await tronWeb.contract(
        PairContract.abi,
        lpToken.address,
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
          tokenA.id,
          tokenB.id,
          convertToHex(amount, 1e18),
          0,
          0,
          address,
          getUnixTimestamp(300),
        )
        .send()

      await fetchLPTokensBalances()
    } catch (err) {
      toggleAlert('Error while adding liquidity. Try again', 'error')
    }
  }

  return (
    <>
      <StakeModal
        handleShowModal={handleShowModal}
        showModal={showModal}
        modalData={{
          text: `Remove liquidity for `,
          onSubmit: onRemoveLiquidity,
          token: lpToken,
        }}
      />
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
            <p className="ml-14 font-bold text-xl">
              {lpToken.name}
              <span className="font-medium"> - APR: 7%</span>
            </p>
          </div>
          <div className="flex">
            <p className="text-base">
              Liquidity {tokenA.symbol}:{' '}
              {convertToNumber(reserveA.toString(), 1)}
            </p>
            <p className="text-base">
              Liquidity {tokenB.symbol}:{' '}
              {convertToNumber(reserveB.toString(), 1)}
            </p>
          </div>
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
          <div className="flex">
            <div className="w-full">
              <LoadingButton text="Add liquidity" onClick={onAddLiquidity} />
            </div>
            {getTokenBalance(lpToken) !== '0.00' && (
              <div className="w-full ml-3">
                <LoadingButton
                  text="Remove liquidity"
                  onSyncClick={() => handleShowModal()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default PoolsItem
