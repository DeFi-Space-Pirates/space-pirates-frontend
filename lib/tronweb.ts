import TronWeb from 'tronweb'
import { getDecimals } from './tokens'

export const getTronWebInstance = () => {
  const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',

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

export const NULL_ADDRESS = '410000000000000000000000000000000000000000'

export const getUnixTimestamp = (secondsToAdd: number): number => {
  return Math.floor((new Date().getTime() + secondsToAdd) / 1000)
}
