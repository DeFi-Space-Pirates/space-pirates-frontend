import tokensList from '../config/constants/tokensList.json'
import { Token1155 } from '../typings/Token'

export const isProjectToken = (id: number): boolean => id >= 1 && id <= 99

export const isWrappedToken = (id: number): boolean => id >= 100 && id <= 199

export const isToken = (id: number): boolean => id >= 1 && id <= 199

export const isItem = (id: number): boolean => id >= 1000 && id <= 9999

export const isTitle = (id: number): boolean => id >= 10000 && id <= 19999

export const isDecoration = (id: number): boolean => id >= 20000 && id <= 99999

export const isBattlefield = (id: number): boolean =>
  id >= 100000 && id >= 199999

export const getDecimals = (id: number): number => {
  const token = tokensList.tokens.find((token) => token.id === id)

  return token?.decimals === 18 ? 1e18 : token?.decimals === 6 ? 1e6 : 1
}

export const getTokenById = (id: number): Token1155 | undefined => {
  return tokensList.tokens.find((token) => token.id === id)
}
