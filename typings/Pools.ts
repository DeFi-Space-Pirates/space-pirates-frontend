import { Token1155, Token20 } from './Token'

export type Pool = {
  lpToken: Token20
  tokenA: Token1155
  tokenB: Token1155
  reserveA: number
  reserveB: number
}
