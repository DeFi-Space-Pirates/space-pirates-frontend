import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAlert } from './AlertContext'

import SpacePiratesTokens from '../config/artifacts/SpacePiratesTokens.json'
import tokensList from '../config/constants/tokensList.json'
import wrappedTokensList from '../config/constants/wrappedTokensList.json'
import { addresses } from '../config/addresses'
import { Balance1155, Balance20 } from '../typings/Balance'
import { convertToNumber } from '../lib/tronweb'

declare global {
  interface Window {
    tronWeb: any
    tronLink: any
    defaultAccount: any
  }
}

//TODO add new properties to tronWeb as we move forward
type TronWebContextValue = {
  tronWeb: {
    isConnected?: boolean
    defaultAccount?: string
    contract: any
    [x: string]: any
  }
  connectTronLink: () => void
  address: string
  balances1155: Balance1155[] | null
  balances20: Balance20[] | null
  getBalanceById: (id: number | undefined) => string
  getBalanceByAddress: (address: string | undefined) => string
}

type TronWebProviderProps = { children: React.ReactNode }

const TronWebContext = createContext<TronWebContextValue | undefined>(undefined)

const TronWebProvider = ({ children }: TronWebProviderProps) => {
  const [tronWeb, setTronWeb] = useState<any>(null)
  const [address, setAddress] = useState('')
  const [balances1155, setBalances1155] = useState<Balance1155[] | null>(null)
  const [balances20, setBalances20] = useState<Balance20[] | null>(null)

  const { toggleAlert } = useAlert()

  const loadTronWeb = useCallback(async (tronWeb: any, address: string) => {
    setTronWeb(tronWeb)
    setAddress(address)

    const spacePiratesTokens = await tronWeb.contract(
      SpacePiratesTokens.abi,
      addresses.shasta.tokensContract,
    )

    try {
      const batchBalances = await spacePiratesTokens
        .balanceOfBatch(
          Array(tokensList.ids.length).fill(address),
          tokensList.ids,
        )
        .call()

      const userBalances = tokensList.ids.map((id, index) => ({
        id: id,
        amount: convertToNumber(batchBalances[index]._hex, id),
      }))

      setBalances1155(userBalances)
    } catch (err) {
      setBalances1155(null)
    }

    try {
      let updatedBalances20: Balance20[] = []
      for (const token of wrappedTokensList.unWrapped) {
        if (token.symbol === 'TRX') {
          const sunBalance = await tronWeb.trx.getBalance(address)

          updatedBalances20.push({
            address: token.address,
            amount: parseFloat(tronWeb.fromSun(sunBalance)).toFixed(2),
            symbol: token.symbol,
          })
        } else {
          const contractInstance = await tronWeb.contract().at(token.address)

          const balance = await contractInstance.balanceOf(address).call()

          updatedBalances20.push({
            address: token.address,
            amount: tronWeb
              .BigNumber(balance._hex)
              .div(1e18)
              .toNumber()
              .toFixed(2),
            symbol: token.symbol,
          })
        }
      }

      setBalances20(updatedBalances20)
    } catch (err) {
      setBalances20(null)
    }
  }, [])

  const connectTronLink = useCallback(async () => {
    // automatic connection without prompt if already approved
    if (window.tronWeb && window.tronLink.ready) {
      window.tronWeb.isConnected = true
      window.tronWeb.defaultAccount = window.tronWeb.defaultAddress.base58

      loadTronWeb(window.tronWeb, window.tronWeb.defaultAddress.base58)
    }

    if (!window.tronWeb) {
      toggleAlert(
        'Install the TronLink extension to use Space Pirates',
        'warning',
      )
    }

    // connection w/ prompt
    if (window.tronWeb && window.tronWeb.ready) {
      window.addEventListener('message', function (e) {
        if (e.data.message && e.data.message.action == 'setAccount') {
          if (window.tronWeb) {
            // switch account
            if (
              e.data.message.data.address != window.tronWeb?.defaultAccount &&
              window.tronWeb !== null
            ) {
              window.tronWeb.isConnected = true
              window.tronWeb.defaultAccount = e.data.message.data.address
              loadTronWeb(window.tronWeb, e.data.message.data.address)
            }
          } else {
            window.location.reload()
          }
        }

        // switch chain
        if (e.data.message && e.data.message.action == 'setNode') {
          window.location.reload()
        }

        if (e.data.message && e.data.message.action == 'acceptWeb') {
          window.tronWeb.isConnected = true
          window.tronWeb.defaultAccount = window.tronWeb.defaultAddress.base58

          loadTronWeb(window.tronWeb, window.tronWeb.defaultAddress.base58)
        }

        if (e.data.message && e.data.message.action == 'disconnectWeb') {
          setTronWeb(null)
          setAddress('')
        }
      })
    }
  }, [toggleAlert, loadTronWeb])

  const getBalanceById = (id: number | undefined) => {
    const balance = balances1155?.find((balance) => balance.id === id)

    return balance ? balance.amount.toString() : '0.00'
  }

  const getBalanceByAddress = (address: string | undefined) => {
    const balance = balances20?.find((balance) => balance.address === address)

    return balance ? balance.amount.toString() : '0.00'
  }

  const value = {
    tronWeb,
    connectTronLink,
    address,
    balances1155,
    balances20,
    getBalanceById,
    getBalanceByAddress,
  }

  return (
    <TronWebContext.Provider value={value}>{children}</TronWebContext.Provider>
  )
}

const useTronWeb = () => {
  const context = useContext(TronWebContext)

  if (context === undefined) {
    throw new Error('useTronWeb must be used within TronWebProvider')
  }

  return context
}

export { TronWebProvider, useTronWeb }
