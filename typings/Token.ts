export type Token = {
  id?: number
  address?: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export type Token1155 = {
  id: number
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

export type Token20 = {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}
