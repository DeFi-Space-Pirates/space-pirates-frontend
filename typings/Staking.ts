export type StakingPool = {
  exists: boolean
  rewardTokenId: number
  stakingTokenId: number
  rewardRate: number
  depositFee: number
  lastUpdateTime: number
  totalSupply: number
  accRewardPerShare: number
}
