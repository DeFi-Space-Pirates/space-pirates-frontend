import { SupportedChains } from './Tron'

export type Quest = {
  questName: string
  ids: number[]
  amounts: number[]
  verifier?: (
    address: string,
    chain: SupportedChains,
    [key]?: any,
  ) => Promise<boolean>
}
