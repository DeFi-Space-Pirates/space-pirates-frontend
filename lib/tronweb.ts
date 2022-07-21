import TronWeb from 'tronweb'
import { getDecimals } from './tokensType'

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
