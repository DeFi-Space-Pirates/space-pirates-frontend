import { createContext, useCallback, useContext, useState } from 'react'
import { useAlert } from './AlertContext'

import SpacePiratesTokens from '../config/artifacts/SpacePiratesTokens.json'
import SpacePiratesFactory from '../config/artifacts/SpacePiratesFactory.json'
import tokensList from '../config/constants/tokensList.json'
import wrappedTokensList from '../config/constants/wrappedTokensList.json'
import { addresses, getAbi, getAddress } from '../config/addresses'
import { Balance1155, Balance20, BalanceLP } from '../typings/Balance'
import { convertToNumber } from '../lib/tronweb'
import { ABIsList, AddressesList, SupportedChains } from '../typings/Tron'
import PairContract from '../config/artifacts/SpacePiratesPair.json'
import { getTokenById } from '../lib/tokens'

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
    defaultAddress?: {
      base58: string
      hex: string
    }
    contract: any
    [x: string]: any
  }
  connectTronLink: () => void
  address: string
  chain: SupportedChains
  balances1155: Balance1155[]
  balances20: Balance20[]
  balancesLP: BalanceLP[]
  getBalanceById: (id: number | undefined) => string
  getBalanceByAddress: (address: string | undefined) => string
  getContractInstance: (
    abiContract: ABIsList,
    contract: AddressesList,
  ) => Promise<any>
}

type TronWebProviderProps = { children: React.ReactNode }

const TronWebContext = createContext<TronWebContextValue | undefined>(undefined)

const TronWebProvider = ({ children }: TronWebProviderProps) => {
  const [tronWeb, setTronWeb] = useState<any>(null)
  const [chain, setChain] = useState<SupportedChains>('mainnet')
  const [address, setAddress] = useState('')
  const [balances1155, setBalances1155] = useState<Balance1155[]>([])
  const [balances20, setBalances20] = useState<Balance20[]>([])
  const [balancesLP, setBalancesLP] = useState<BalanceLP[]>([])

  const { toggleAlert } = useAlert()

  const loadTronWeb = useCallback(
    async (tronWeb: any, address: string) => {
      if (
        // tronWeb.fullNode.host === 'https://api.trongrid.io' ||
        tronWeb.fullNode.host === 'https://api.shasta.trongrid.io'
      ) {
        setTronWeb(tronWeb)
        setAddress(address)

        setChain(
          // tronWeb.fullNode.host === 'https://api.trongrid.io'
          //   ? 'mainnet'
          //   :
          'shasta',
          // ,
        )

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
          setBalances1155([])
        }

        let updatedBalances20: Balance20[] = []
        try {
          for (const token of wrappedTokensList.unWrapped) {
            if (token.symbol === 'TRX') {
              const sunBalance = await tronWeb.trx.getBalance(address)

              updatedBalances20.push({
                address: token.address,
                amount: parseFloat(tronWeb.fromSun(sunBalance)).toFixed(2),
                symbol: token.symbol,
              })
            } else {
              const contractInstance = await tronWeb
                .contract()
                .at(token.address)

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
          setBalances20([])
        }

        let updatedBalancesLP: BalanceLP[] = []
        try {
          const spacePiratesFactory = await tronWeb.contract(
            SpacePiratesFactory.abi,
            addresses.shasta.factoryContract,
          )

          const poolsAmount = await spacePiratesFactory.allPairsLength().call()

          const convertedAmount = tronWeb.BigNumber(poolsAmount._hex).toNumber()

          for (let i = 0; i < convertedAmount; i++) {
            const pairAddress = await spacePiratesFactory.allPairs(i).call()

            const pairContract = await tronWeb.contract(
              PairContract.abi,
              pairAddress,
            )

            const balance = await pairContract.balanceOf(address).call()

            const tokenIds = await pairContract.getTokenIds().call()

            const tokenA = getTokenById(
              tronWeb.BigNumber(tokenIds._token0._hex).toNumber(),
            )

            const tokenB = getTokenById(
              tronWeb.BigNumber(tokenIds._token1._hex).toNumber(),
            )

            updatedBalancesLP.push({
              address: pairAddress,
              balance: tronWeb
                .BigNumber(balance._hex)
                .div(1e18)
                .toNumber()
                .toFixed(2),
              name: `${tokenA?.symbol}/${tokenB?.symbol}`,
              symbol: '',
            })
          }

          setBalancesLP(updatedBalancesLP)
        } catch (err) {
          setBalancesLP([])
        }

        toggleAlert(
          `Connected to ${
            tronWeb.fullNode.host === 'https://api.trongrid.io'
              ? 'mainnet'
              : 'Shasta testnet'
          }`,
          'success',
        )
      } else {
        toggleAlert(
          'Wrong chain! Contracts are deployed Shasta testnet',
          'error',
          500000,
        )
      }
    },
    [toggleAlert],
  )

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
            if (e.data.message.data.address === false) {
              setTronWeb(null)
              setAddress('')
            }
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

  const getContractInstance = useCallback(
    async (abiContract: ABIsList, contract: AddressesList) => {
      const abi = getAbi(abiContract)
      const contractAddress = getAddress(contract, chain)

      const instance = abi
        ? await tronWeb.contract(abi, contractAddress)
        : await tronWeb.contract().at(contractAddress)

      return instance
    },
    [chain, tronWeb],
  )

  const value = {
    tronWeb,
    connectTronLink,
    address,
    chain,
    balances1155,
    balances20,
    balancesLP,
    getBalanceById,
    getBalanceByAddress,
    getContractInstance,
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
