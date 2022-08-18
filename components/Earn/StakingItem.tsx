import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'
import { useTronWeb } from '../../contexts/TronWebContext'

import { StakeModalData, StakingPool, UserInfo } from '../../typings/Staking'
import { getTokenById } from '../../lib/tokens'
import {
  convertToHex,
  convertToNumber,
  getTronWebInstance,
} from '../../lib/tronweb'
import StakeModal from './StakeModal'
import { Token, Token1155 } from '../../typings/Token'

type StakingItemProps = {
  poolId: number
}

const StakingItem = ({ poolId }: StakingItemProps) => {
  const [pool, setPool] = useState<StakingPool | undefined>(undefined)
  const [pendingRewards, setPendingRewards] = useState('')
  const [userInfo, setUserInfo] = useState<UserInfo>({
    balances: '0',
    rewardDebt: '0',
    rewards: '0',
  })
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<StakeModalData | undefined>(
    undefined,
  )

  const { toggleAlert } = useAlert()
  const { getContractInstance, address, isApprovedSP } = useTronWeb()

  const handleShowModal = (mode?: 'stake' | 'unstake', token?: Token1155) => {
    setShowModal((prev) => !prev)

    mode === 'stake' &&
      setModalData({ text: 'Stake', token: token!, onSubmit: onStakeTokens })
    mode === 'unstake' &&
      setModalData({
        text: 'Unstake',
        token: token!,
        onSubmit: onUnStakeTokens,
      })
  }

  const fetchPool = useCallback(async () => {
    try {
      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      const stakingPool = await spacePiratesStaking.stakingPools(poolId).call()

      stakingPool.rewardTokenId = getTronWebInstance()
        .BigNumber(stakingPool.rewardTokenId._hex)
        .toNumber()
      stakingPool.rewardRate = getTronWebInstance()
        .BigNumber(stakingPool.rewardRate._hex)
        .toNumber()
      stakingPool.depositFee = getTronWebInstance()
        .BigNumber(stakingPool.depositFee._hex)
        .toNumber()
      stakingPool.lastUpdateTime = getTronWebInstance()
        .BigNumber(stakingPool.lastUpdateTime._hex)
        .toNumber()
      stakingPool.totalSupply = getTronWebInstance()
        .BigNumber(stakingPool.totalSupply._hex)
        .toNumber()
      stakingPool.accRewardPerShare = getTronWebInstance()
        .BigNumber(stakingPool.accRewardPerShare._hex)
        .toNumber()

      setPool({
        stakingTokenId: poolId,
        exists: stakingPool.exists,
        accRewardPerShare: stakingPool.accRewardPerShare,
        depositFee: stakingPool.depositFee,
        lastUpdateTime: stakingPool.lastUpdateTime,
        rewardRate: stakingPool.rewardRate,
        rewardTokenId: stakingPool.rewardTokenId,
        totalSupply: stakingPool.totalSupply,
      })

      return stakingPool.rewardTokenId
    } catch (err) {
      toggleAlert('Error while fetching the pool. Try again.', 'error')
    }
  }, [getContractInstance, poolId, toggleAlert])

  const fetchPendingRewards = useCallback(
    async (rewardTokenId: number) => {
      try {
        const spacePiratesStaking = await getContractInstance(
          'stakingContract',
          'stakingContract',
        )

        const rewardsRes = await spacePiratesStaking
          .pendingRewards(poolId, address)
          .call()

        setPendingRewards(convertToNumber(rewardsRes._hex, rewardTokenId))

        const userInfoRes = await spacePiratesStaking
          .usersInfo(poolId, address)
          .call()

        setUserInfo({
          balances: convertToNumber(userInfoRes.balances._hex, 1),
          rewardDebt: convertToNumber(userInfoRes.rewardDebt._hex, 1),
          rewards: convertToNumber(userInfoRes.rewards._hex, 1),
        })
      } catch (err) {
        toggleAlert('Errors while fetching pools info. Try again.', 'error')
      }
    },
    [address, getContractInstance, toggleAlert, poolId],
  )

  const onStakeTokens = async (amount: string) => {
    try {
      await isApprovedSP('stakingContract')

      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .stake(pool?.stakingTokenId, convertToHex(amount, 1e18))
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    }
  }

  const onUnStakeTokens = async (amount: string) => {
    try {
      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .unstake(pool?.stakingTokenId, convertToHex(amount, 1e18))
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    }
  }

  const onHarvestTokens = async () => {
    try {
      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .getReward(pool?.stakingTokenId)
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const rewardTokenId = await fetchPool()
      await fetchPendingRewards(rewardTokenId)
    }

    fetch()
  }, [fetchPendingRewards, fetchPool])

  return (
    <>
      {pool && (
        <StakeModal
          showModal={showModal}
          handleShowModal={handleShowModal}
          modalData={
            modalData
              ? modalData
              : {
                  text: 'Stake',
                  onSubmit: onStakeTokens,
                  token: getTokenById(pool?.stakingTokenId) as Token,
                }
          }
        />
      )}
      <div className="md:w-11/12 bg-base-200 p-4 grid grid-cols-12 gap-6 md:gap-y-2 md:gap-x-6 rounded-md drop-shadow-md">
        {pool ? (
          <>
            <div className="md:col-span-3 col-span-12 flex items-center">
              <Image
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt="token"
                height={20}
                width={20}
                layout="fixed"
              />
              <p className="ml-2 font-semibold text-lg">
                Stake {getTokenById(pool?.stakingTokenId)?.symbol}
              </p>
            </div>
            <div className="md:col-span-1 col-span-6">
              <p className="text-sm font-light">Staked</p>
              <p className="font-bold text-lg">{userInfo.balances}</p>
            </div>
            <div className="md:col-span-2 col-span-6">
              <p className="text-sm font-light">
                {getTokenById(pool?.rewardTokenId)?.symbol} Earned
              </p>
              <p className="font-bold text-lg">0</p>
            </div>
            <div className="md:col-span-1 col-span-6">
              <p className="text-sm font-light">APR</p>
              <p className="font-bold text-lg">22.5%</p>
            </div>
            <div className="md:col-span-3 col-span-6">
              <p className="text-sm font-light">Total staked</p>
              <p className="font-bold text-lg">
                {convertToNumber(pool?.totalSupply.toString(), 1)}
              </p>
            </div>
            <div className="md:col-span-2 col-span-12">
              {userInfo.balances !== '0.00' ? (
                <LoadingButton
                  text={
                    pendingRewards !== '0.00'
                      ? `HARVEST ${pendingRewards} ${
                          getTokenById(pool?.rewardTokenId)?.symbol
                        }`
                      : 'UNSTAKE'
                  }
                  {...(pendingRewards !== '0.00'
                    ? { onClick: onHarvestTokens }
                    : {
                        onSyncClick: () =>
                          handleShowModal(
                            'unstake',
                            getTokenById(pool?.stakingTokenId),
                          ),
                      })}
                />
              ) : (
                <LoadingButton
                  text="STAKE"
                  onSyncClick={() =>
                    handleShowModal('stake', getTokenById(pool?.stakingTokenId))
                  }
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="md:col-span-3 col-span-12 bg-gray-200  animate-pulse h-8 rounded-md"></div>
            <div className="md:col-span-1 col-span-6 bg-gray-200  animate-pulse h-8 rounded-md"></div>
            <div className="md:col-span-2 col-span-6 bg-gray-200  animate-pulse h-8 rounded-md"></div>
            <div className="md:col-span-1 col-span-6 bg-gray-200  animate-pulse h-8 rounded-md"></div>
            <div className="md:col-span-3 col-span-6 bg-gray-200  animate-pulse h-8 rounded-md"></div>
            <div className="md:col-span-2 col-span-12 bg-gray-200  animate-pulse h-8 rounded-md"></div>
          </>
        )}
      </div>
    </>
  )
}

export default StakingItem
