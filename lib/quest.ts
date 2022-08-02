import { ethers, BigNumber } from 'ethers'
import { Quest } from '../typings/Quest'
import { convertToNumber, SHASTA_CHAIN_ID } from './tronweb'

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
    ...quest,
    receiver: hexAddress.replace(/^.{2}/g, '0x'),
  })

  return signature
}
