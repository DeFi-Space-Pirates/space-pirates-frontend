import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAlert } from '../../contexts/AlertContext'
import LoadingButton from '../layout/LoadingButton'
import { useTronWeb } from '../../contexts/TronWebContext'

import { StakeModalData, StakingPool, UserInfo } from '../../typings/Staking'
import { getTokenById } from '../../lib/tokens'
import { convertToHex, convertToNumber } from '../../lib/tronweb'
import StakeModal from './StakeModal'
import { Token1155 } from '../../typings/Token'
import { getAddress } from '../../config/addresses'

type StakingItemProps = {
  stakingPool: StakingPool
}

const StakingItem = ({
  stakingPool: { stakingTokenId, rewardTokenId, totalSupply },
}: StakingItemProps) => {
  const [loading, setLoading] = useState(false)
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

  const stakingToken = getTokenById(stakingTokenId)
  const rewardToken = getTokenById(rewardTokenId)

  const { toggleAlert } = useAlert()
  const { tronWeb, getContractInstance, address, chain } = useTronWeb()

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

  useEffect(() => {
    const fetchPendingRewards = async () => {
      try {
        const spacePiratesStaking = await getContractInstance(
          'stakingContract',
          'stakingContract',
        )

        const rewardsRes = await spacePiratesStaking
          .pendingRewards(stakingTokenId, address)
          .call()

        setPendingRewards(convertToNumber(rewardsRes._hex, rewardTokenId))

        const userInfoRes = await spacePiratesStaking
          .usersInfo(stakingTokenId, address)
          .call()

        setUserInfo({
          balances: convertToNumber(userInfoRes.balances._hex, 1),
          rewardDebt: convertToNumber(userInfoRes.rewardDebt._hex, 1),
          rewards: convertToNumber(userInfoRes.rewards._hex, 1),
        })
      } catch (err) {
        toggleAlert('Errors while fetching pools info. Try again.', 'error')
      }
    }

    tronWeb && fetchPendingRewards()
  }, [
    address,
    stakingTokenId,
    rewardTokenId,
    getContractInstance,
    tronWeb,
    toggleAlert,
  ])

  const onStakeTokens = async (amount: string) => {
    setLoading(true)

    try {
      const spacePiratesTokens = await getContractInstance(
        'tokensContract',
        'tokensContract',
      )

      const isApproved = await spacePiratesTokens
        .isApprovedForAll(address, getAddress('stakingContract', chain))
        .call()

      !isApproved &&
        (await spacePiratesTokens
          .setApprovalForAll(getAddress('stakingContract', chain), true)
          .send())

      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .stake(stakingTokenId, convertToHex(amount, 1e18))
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  const onUnStakeTokens = async (amount: string) => {
    setLoading(true)

    try {
      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .unstake(stakingTokenId, convertToHex(amount, 1e18))
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
      const spacePiratesStaking = await getContractInstance(
        'stakingContract',
        'stakingContract',
      )

      await spacePiratesStaking
        .getReward(stakingTokenId)
        .send({ shouldPollResponse: true })
    } catch (err) {
      toggleAlert('Error during the staking. Try again', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <StakeModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        modalData={
          modalData
            ? modalData
            : { text: 'Stake', onSubmit: onStakeTokens, token: stakingToken! }
        }
        loading={loading}
      />
      <div className="md:w-11/12 bg-base-200 p-4 grid grid-cols-12 gap-6 md:gap-y-2 md:gap-x-6 rounded-md drop-shadow-md">
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
        <div className="md:col-span-1 col-span-6">
          <p className="text-sm font-light">Staked</p>
          <p className="font-bold text-lg">{userInfo.balances}</p>
        </div>
        <div className="md:col-span-2 col-span-6">
          <p className="text-sm font-light">{rewardToken?.symbol} Earned</p>
          <p className="font-bold text-lg">0</p>
        </div>
        <div className="md:col-span-1 col-span-6">
          <p className="text-sm font-light">APR</p>
          <p className="font-bold text-lg">22.5%</p>
        </div>
        <div className="md:col-span-3 col-span-6">
          <p className="text-sm font-light">Total staked</p>
          <p className="font-bold text-lg">
            {convertToNumber(totalSupply.toString(), 1)}
          </p>
        </div>
        <div className="md:col-span-2 col-span-12">
          {userInfo.balances !== '0.00' ? (
            <LoadingButton
              loading={loading}
              text={
                pendingRewards !== '0.00'
                  ? `HARVEST ${pendingRewards} ${rewardToken?.symbol}`
                  : 'UNSTAKE'
              }
              onClick={() =>
                pendingRewards !== '0.00'
                  ? onHarvestTokens()
                  : handleShowModal('unstake', stakingToken)
              }
            />
          ) : (
            <LoadingButton
              loading={loading}
              text="STAKE"
              onClick={() => handleShowModal('stake', stakingToken)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default StakingItem
