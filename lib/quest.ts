import { ethers, BigNumber } from 'ethers'
import { Quest } from '../typings/Quest'
import { hasMintedFromFaucet, mockVerifier } from './questVerifiers'
import { SHASTA_CHAIN_ID } from './tronweb'

export const getSignature = async (
  hexAddress: string,
  quest: Quest,
): Promise<string> => {
  const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_NPC_PRIVATE_KEY!)

  const domain = {
    name: 'Space Pirates',
    version: '1',
    chainId: BigNumber.from(SHASTA_CHAIN_ID),
    verifyingContract: process.env.NEXT_PUBLIC_NPC_ADDRESS_HEX,
  }
  const types = {
    SpacePiratesQuest: [
      { name: 'questName', type: 'string' },
      { name: 'ids', type: 'uint256[]' },
      { name: 'amounts', type: 'uint256[]' },
      { name: 'receiver', type: 'address' },
    ],
  }

  const signature = await signer._signTypedData(domain, types, {
    questName: quest.questName,
    ids: quest.ids,
    amounts: quest.amounts,
    receiver: hexAddress.replace(/^.{2}/g, '0x'),
  })

  return signature
}

export const offGameQuests: Quest[] = [
  {
    questName: 'Explore website',
    ids: [1],
    amounts: [100],
  },
  {
    questName: 'Mint from faucet',
    ids: [1],
    amounts: [250],
    verifier: hasMintedFromFaucet,
  },
]

export const achievementsQuests: Quest[] = [
  {
    questName: 'Collect 1 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Collect 5 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Collect 10 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Collect 15 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Collect 20 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Collect 25 NFTs',
    ids: [2],
    amounts: [150],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 1',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 2',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 3',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 4',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 5',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
  {
    questName: 'Awake an NFT to level 6',
    ids: [2],
    amounts: [200],
    verifier: mockVerifier,
  },
]

export const serverWideQuests: Quest[] = [
  {
    questName: 'Get 1st place in the first-season tournament',
    ids: [2],
    amounts: [10000],
    verifier: mockVerifier,
  },
]

export const limitedTimeQuests: Quest[] = [
  {
    questName: 'Score 10000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
    verifier: mockVerifier,
  },
  {
    questName: 'Score 20000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
    verifier: mockVerifier,
  },
  {
    questName: 'Score 30000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
    verifier: mockVerifier,
  },
  {
    questName: 'Score 40000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
    verifier: mockVerifier,
  },
  {
    questName: 'Score 50000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
    verifier: mockVerifier,
  },
]

export const repeatableQuests: Quest[] = [
  {
    questName: 'Participate in 50 PvP battles in one month',
    ids: [1],
    amounts: [7500],
    verifier: mockVerifier,
  },
  {
    questName: 'Participate in 100 PvP battles in one month',
    ids: [1],
    amounts: [7500],
    verifier: mockVerifier,
  },
  {
    questName: 'Participate in 150 PvP battles in one month',
    ids: [1],
    amounts: [7500],
    verifier: mockVerifier,
  },
  {
    questName: 'Participate in 200 PvP battles in one month',
    ids: [1],
    amounts: [7500],
    verifier: mockVerifier,
  },
  {
    questName: 'Participate in 250 PvP battles in one month',
    ids: [1],
    amounts: [7500],
    verifier: mockVerifier,
  },
]
