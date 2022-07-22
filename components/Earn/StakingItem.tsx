import { useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'
import { useTronWeb } from '../../contexts/TronWebContext'

import SpacePiratesStaking from '../../config/artifacts/SpacePiratesStaking.json'
import SpacePiratesTokens from '../../config/artifacts/SpacePiratesTokens.json'

import { addresses } from '../../config/addresses'
import { StakingPool } from '../../typings/Staking'
import { getTokenById } from '../../lib/tokens'
import { convertToHex } from '../../lib/tronweb'
import StakeModal from './StakeModal'

type StakingItemProps = {
  stakingPool: StakingPool
}

const StakingItem = ({
  stakingPool: { stakingTokenId, totalSupply },
}: StakingItemProps) => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()
  const { tronWeb, address } = useTronWeb()

  const handleShowModal = () => {
    setShowModal((prev) => !prev)
  }

  //TODO fetch pending rewards con pendingRewards(stakingTokenId, _userAddres)

  const onStakeTokens = async () => {
    setLoading(true)

    try {
      const spacePiratesTokens = await tronWeb.contract(
        SpacePiratesTokens.abi,
        addresses.shasta.tokensContract,
      )

      const isApproved = await spacePiratesTokens
        .isApprovedForAll(address, addresses.shasta.splitContract)
        .call()

      !isApproved &&
        (await spacePiratesTokens
          .setApprovalForAll(addresses.shasta.splitContract, true)
          .send())

      const spacePiratesStaking = await tronWeb.contract(
        SpacePiratesStaking.abi,
        addresses.shasta.stakingContract,
      )

      await spacePiratesStaking
        .stake(/*stakingTokenId, convertToHex(amount, 1e18)*/)
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onUnStakeTokens = async () => {
    setLoading(true)

    try {
      const spacePiratesStaking = await tronWeb.contract(
        SpacePiratesStaking.abi,
        addresses.shasta.stakingContract,
      )

      await spacePiratesStaking
        .unstake(/**stakingPoolId */)
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onHarvestTokens = async () => {
    setLoading(true)

    try {
      const spacePiratesStaking = await tronWeb.contract(
        SpacePiratesStaking.abi,
        addresses.shasta.stakingContract,
      )

      await spacePiratesStaking
        .getReward(/**stakingPoolId */)
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StakeModal showModal={showModal} handleShowModal={handleShowModal} />
      <div className="md:w-11/12 bg-base-200 p-4 grid grid-cols-12 gap-6 md:gap-4 rounded-md drop-shadow-md">
        <div className="md:col-span-3 col-span-12 flex items-center">
          <Image
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
            alt="token"
            height={20}
            width={20}
            layout="fixed"
          />
          <p className="ml-2 font-semibold text-lg">
            Stake {getTokenById(stakingTokenId)?.symbol}
          </p>
        </div>
        <div className="md:col-span-2 sm:col-span-3 col-span-4">
          <p className="text-sm font-light">DBL Earned</p>
          <p className="font-bold text-lg">0</p>
        </div>
        <div className="md:col-span-2 col-span-3">
          <p className="text-sm font-light">APR</p>
          <p className="font-bold text-lg">22.5%</p>
        </div>
        <div className="md:col-span-3 sm:col-span-6 col-span-5">
          <p className="text-sm font-light">Total staked</p>
          <p className="font-bold text-lg">{totalSupply}</p>
        </div>
        <div className="md:col-span-2 col-span-12">
          {/* {someState ? (
              <>
                <p className="text-center text-lg">
                  Staked: <span className="font-semibold">12.545</span>
                </p>
                <LoadingButton
                  loading={loading}
                  text={someState ? "HARVEST" : "UNSTAKE"}
                  onClick={() => someState ? onHarvestTokens() : onUnStakeTokens()}
                />
              </>
            ) : ( */}
          <LoadingButton
            loading={loading}
            text="STAKE"
            onClick={() => handleShowModal()}
          />
          {/* )} */}
        </div>
      </div>
    </>
  )
}

export default StakingItem
