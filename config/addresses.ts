import {
  ABIsList,
  AddressesConfig,
  AddressesList,
  SupportedChains,
} from '../typings/Tron'
import TokensContract from './artifacts/SpacePiratesTokens.json'
import StakingContract from './artifacts/SpacePiratesStaking.json'
import SplitContract from './artifacts/AsteroidsSplitContract.json'
import FaucetContract from './artifacts/SpacePiratesFaucet.json'
import WrapperContract from './artifacts/SpacePiratesWrapper.json'
import FactoryContract from './artifacts/SpacePiratesFactory.json'
import RouterContract from './artifacts/SpacePiratesRouter.json'
import StaticRouterContract from './StaticRouterAbi.json'
import QuestRedeemContract from './artifacts/SpacePiratesQuestRedeem.json'
import MasterChefContract from './artifacts/SpacePiratesMasterChef.json'
import BattlefieldContract from './artifacts/BattleFieldFirstCollection.json'
import MarketplaceContract from './artifacts/SpacePiratesItemsMarketPlace.json'
import ChainIdContract from './artifacts/ChainId.json'

export const addresses: AddressesConfig = {
  shasta: {
    tokensContract: 'TFi7jf8LUaRtRKQj2qX1scAvV3N6PNY1sn',
    stakingContract: 'TVGWGVJCbFFvA653ssqeMYQsZGpSB2wex6', //TODO update
    splitContract: 'TWKDXLfDD9GUgD1TXwYwZzKhK4sR8eV6zF',
    faucetContract: 'TDTvQK2mvE8BbbDMAJwUinB9YenWSJfryG',
    wrapperContract: 'THZ96fDPNnyxdfo8duDXopeR1iVE3Q5jok',
    factoryContract: 'TAmKKxNEarCQ9CHjmkb7njgJgxE23PhAmM',
    routerContract: 'TLZHKCxrLLJfLzW85JGUwJQuQrCcDjUGd1',
    masterChefContract: 'TQ794PvgfR9TV6ewZq2GiJLkc15T82fris',
    questRedeemContract: 'TJLepsv189xaY4v1YFJV9rtthKEhoBYW92',
    battleFieldMintContract: 'TFZZTjq4XqnY4Y29zqYgXXf56ywVeiDGmC',
    marketPlaceContract: 'TWVqwTHbY6ZmcxhA6TkfbhQLTzTa7BLrZ9',
    nftContract: 'TNAweNj5SUnmpNxHgSmiP6BAkchkipKNs7',
    nftCollectionContract: 'TRzCUXtZV6VuqXTB23ErhDijTnPv7xN8P1',
    nftStarterContract: 'TTYawiSnY9gyN4CQCYhmT5Tw9KbhofezGb',
    chainId: 'TUcNroFU1HSgNJDMjNLoFuhdNj45oaFAbT',
    USDT: 'TUXYeqLUibq7m9MCMtyzLKptu296xrdoXq',
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
    nftContract: '',
    nftCollectionContract: '',
    nftStarterContract: '',
    chainId: 'TB8L6uZ8g9YWPFqrAfxD2sE7TuVxRwhrGR',
    USDT: '',
    USDD: '',
  },
}

export const getAddress = (
  contract: AddressesList,
  chain: SupportedChains,
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
      return BattlefieldContract.abi
    default:
      return null //return null when we don't have the ABI and so we use tronWeb.contract.at("address")
  }
}
