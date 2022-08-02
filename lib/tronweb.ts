import TronWeb from 'tronweb'
import { getDecimals } from './tokens'

export const getTronWebInstance = () => {
  const tronWeb = new TronWeb({
    fullHost: process.env.TRON_WEB_NODE || 'https://api.shasta.trongrid.io',
    privateKey: process.env.TRON_PRIVATE_KEY,
  })

  return tronWeb
}

export const convertToNumber = (hex: string, id: number): string => {
  const decimals = getDecimals(id)

  return getTronWebInstance()
    .BigNumber(hex)
    .div(decimals)
    .toNumber()
    .toFixed(decimals > 1 ? 2 : 0)
}

export const convertToHex = (amount: string, decimals: number): string => {
  return getTronWebInstance().toHex(
    getTronWebInstance().BigNumber(amount).multipliedBy(decimals),
  )
}

export const getUnixTimestamp = (secondsToAdd: number): number => {
  return Math.floor(new Date().getTime() / 1000) + secondsToAdd
}

export const NULL_ADDRESS = '410000000000000000000000000000000000000000'

export const SHASTA_CHAIN_ID =
  '5445977513522854804495954979734972355986215779757871138206'

export const MAINNET_CHAIN_ID =
  '753943026483768832559776246818017090907445561699745551324'
