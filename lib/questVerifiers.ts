import { getTronWebInstance } from './tronweb'
import SpacePiratesFaucet from '../config/artifacts/SpacePiratesFaucet.json'
import { addresses, getAddress } from '../config/addresses'
import { SupportedChains } from '../typings/Tron'

export const hasMintedFromFaucet = async (
  address: string,
  chain: SupportedChains,
): Promise<boolean> => {
  const events = await getTronWebInstance().getEventResult(
    getAddress('faucetContract', chain),
    {
      sinceTimestamp: 0,
      eventName: 'TokenMint',
      onlyConfirm: true,
    },
  )

  return events.some(
    (event: { result: { to: string } }) =>
      event.result.to ===
      getTronWebInstance().address.toHex(address).replace(/^.{2}/g, '0x'),
  )
}

export const mockVerifier = async (
  address: string,
  chain: SupportedChains,
): Promise<boolean> => {
  return false
}
