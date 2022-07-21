import { useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'
import { useTronWeb } from '../../contexts/TronWebContext'

import SpacePiratesStaking from '../../config/artifacts/SpacePiratesStaking.json'
import SpacePiratesTokens from '../../config/artifacts/SpacePiratesTokens.json'

import { addresses } from '../../config/addresses'

type StakingItemProps = {
  title: string
}

//TODO getStaticProps per fetch stakingPairs
// - poolAmount returns the amount of Pools. then with stakingPools(id) we get back the pair info

const StakingItem = ({ title }: StakingItemProps) => {
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()
  const { tronWeb, address } = useTronWeb()

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
        .stake(/**stakingPoolId */)
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
    <div className="md:w-11/12 bg-base-200 p-4 grid grid-cols-12 gap-6 md:gap-4 rounded-md drop-shadow-md">
      <div className="md:col-span-3 col-span-12 flex items-center">
        <Image
          src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
          alt="token"
          height={20}
          width={20}
          layout="fixed"
        />
        <p className="ml-2 font-semibold text-lg">{title}</p>
      </div>
      <div className="md:col-span-2 sm:col-span-3 col-span-4">
        <p className="text-sm font-light">DBL Earned</p>
        <p className="font-bold text-lg">0</p>
      </div>
      <div className="md:col-span-2 col-span-3">
        <p className="text-sm font-light">APR</p>
        <p className="font-bold text-lg">18.5%</p>
      </div>
      <div className="md:col-span-3 sm:col-span-6 col-span-5">
        <p className="text-sm font-light">Total staked</p>
        <p className="font-bold text-lg">$129.052.929</p>
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
          onClick={() => onStakeTokens()}
        />
        {/* )} */}
      </div>
    </div>
  )
}

export default StakingItem
