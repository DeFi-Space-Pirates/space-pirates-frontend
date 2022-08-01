import { ABIsList, AddressesConfig, AddressesList } from '../typings/Tron'
import TokensContract from './artifacts/SpacePiratesTokens.json'
import StakingContract from './artifacts/SpacePiratesStaking.json'
import SplitContract from './artifacts/AsteroidsSplitContract.json'
import FaucetContract from './artifacts/SpacePiratesFaucet.json'
import WrapperContract from './artifacts/SpacePiratesWrapper.json'
import FactoryContract from './artifacts/SpacePiratesFactory.json'
import RouterContract from './artifacts/SpacePiratesRouter.json'
import StaticRouterContract from './artifacts/StaticRouterAbi.json'
import QuestRedeemContract from './artifacts/SpacePiratesQuestRedeem.json'
import MasterChefContract from './artifacts/SpacePiratesMasterChef.json'
import BattlefieldContract from './artifacts/BattleFieldFirstCollection.json'
import MarketplaceContract from './artifacts/SpacePiratesItemsMarketPlace.json'
import ChainIdContract from './artifacts/ChainId.json'

export const addresses: AddressesConfig = {
  shasta: {
    tokensContract: 'TGWs8t3qyKPLK4qZpFKu6CbFLSwqJQv7G6',
    stakingContract: 'TVGWGVJCbFFvA653ssqeMYQsZGpSB2wex6',
    splitContract: 'TXrkEan1KVH4WRcMm9uvH24FYBNheWNfp9',
    faucetContract: 'TCk7F8cy4z6eGCSDEV7n4vNUkrY5xJLLq3',
    wrapperContract: 'TATbv6Nhe6qj2GMZEYNwudRqH1UxyvjvJT',
    factoryContract: 'TMtYcy5du4mJTgdbdUjA3hjb8DCe1g64xc',
    routerContract: 'TEQNWY2YxeJ6hjNon8D8KmTnDj8ic63Wye',
    masterChefContract: 'TQM1NVobX1K2gVSXgzjQNPSA3L29UkZLb9',
    questRedeemContract: 'TBwQgRPG37d1cZenmTDEZHc8cXQg6kVhag',
    battleFieldMintContract: 'TYsdaKNa441uuUWd2YEEYVHghsiqi9ZAAm',
    marketPlaceContract: 'TXv9UVcdRreQWGoL8d9Rhj9mwxaMkGACNX',
    chainId: 'TUcNroFU1HSgNJDMjNLoFuhdNj45oaFAbT',
    USDT: 'TUXYeqLUibq7m9MCMtyzLKptu296xrdoXq',
    USDC: 'THFMQvfckg4UmauGW4DEaHmt35WA2A1afT',
    USDD: 'TV6StXz41Z1zmHtjzBQ93Y9jNEAvHSDoQ7',
  },
  mainnet: {
    tokensContract: '',
    stakingContract: '',
    splitContract: '',
    faucetContract: '',
    wrapperContract: '',
    factoryContract: '',
    routerContract: '',
    masterChefContract: '',
    questRedeemContract: '',
    battleFieldMintContract: '',
    marketPlaceContract: '',
    chainId: 'TB8L6uZ8g9YWPFqrAfxD2sE7TuVxRwhrGR',
    USDT: '',
    USDC: '',
    USDD: '',
  },
}

export const getAddress = (
  contract: AddressesList,
  chain: 'mainnet' | 'shasta',
): string => {
  return addresses[chain][contract]
}

export const getAbi = (contract: ABIsList) => {
  switch (contract) {
    case 'wrapperContract':
      return WrapperContract.abi
    case 'tokensContract':
      return TokensContract.abi
    case 'stakingContract':
      return StakingContract.abi
    case 'splitContract':
      return SplitContract.abi
    case 'staticRouterContract':
      return StaticRouterContract
    case 'routerContract':
      return RouterContract.abi
    case 'questRedeemContract':
      return QuestRedeemContract.abi
    case 'masterChefContract':
      return MasterChefContract.abi
    case 'marketPlaceContract':
      return MarketplaceContract.abi
    case 'faucetContract':
      return FaucetContract.abi
    case 'factoryContract':
      return FactoryContract.abi
    case 'chainId':
      return ChainIdContract.abi
    case 'battleFieldMintContract':
      return BattlefieldContract
    default:
      return null //return null when we don't have the ABI and so we use tronWeb.contract.at("address")
  }
}
