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
  return getTronWebInstance()
    .BigNumber(hex)
    .div(getDecimals(id))
    .toNumber()
    .toFixed(2)
}
