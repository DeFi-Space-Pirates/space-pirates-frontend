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
import { addresses } from '../config/addresses'
import { Balance } from '../typings/Balance'

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
  balances: Balance[] | null
}

type TronWebProviderProps = { children: React.ReactNode }

const TronWebContext = createContext<TronWebContextValue | undefined>(undefined)

const TronWebProvider = ({ children }: TronWebProviderProps) => {
  const [tronWeb, setTronWeb] = useState<any>(null)
  const [address, setAddress] = useState('')
  const [balances, setBalances] = useState<Balance[] | null>(null)

  const { toggleAlert } = useAlert()

  const loadTronWeb = async (tronWeb: any, address: string) => {
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
        amount: tronWeb
          .BigNumber(batchBalances[index]._hex)
          .div(10e19)
          .toNumber(),
      }))

      setBalances(userBalances)
    } catch (err) {
      setBalances(null)
    }
  }

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
  }, [toggleAlert])

  const value = {
    tronWeb,
    connectTronLink,
    address,
    balances,
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
