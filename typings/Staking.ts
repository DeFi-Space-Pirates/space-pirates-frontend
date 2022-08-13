import { Token1155 } from './Token'

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

export type UserInfo = {
  balances: string
  rewardDebt: string
  rewards: string
}

export type StakeModalData = {
  text: string
  token: Token1155
  onSubmit: (amount: string) => Promise<void>
}
