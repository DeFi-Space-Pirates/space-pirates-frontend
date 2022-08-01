import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import FaucetCard from '../../components/Faucet/FaucetCard'
import { convertToNumber, getTronWebInstance } from '../../lib/tronweb'

import tokensList from '../../config/constants/tokensList.json'
import SpacePiratesFaucet from '../../config/artifacts/SpacePiratesFaucet.json'
import { addresses } from '../../config/addresses'
import { Token1155 } from '../../typings/Token'
import { isToken } from '../../lib/tokens'

type SupportedToken = Token1155 & { maxAmount: string }

export const getStaticProps: GetStaticProps<{
  supportedTokens: SupportedToken[]
}> = async () => {
  const tronWeb = getTronWebInstance()
  const spacePiratesFaucet = await tronWeb.contract(
    SpacePiratesFaucet.abi,
    addresses.shasta.faucetContract,
  )

  const result: { type: string; _hex: string }[] = await spacePiratesFaucet
    .getSupportedTokens()
    .call()

  const supportedIds = result.map((res) =>
    tronWeb.BigNumber(res._hex).toNumber(),
  )

  let supportedTokens = []

  for (const token of tokensList.tokens) {
    if (supportedIds.includes(token.id)) {
      const maxMintHex = await spacePiratesFaucet
        .tokenMintLimit(token.id)
        .call()

      const maxAmount = convertToNumber(maxMintHex._hex, token.id)

      supportedTokens.push({ ...token, maxAmount })
    }
  }

  return {
    props: { supportedTokens },
  }
}

const Faucet = ({
  supportedTokens,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Faucet</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Faucet</p>
        <p className="text-xl italic">
          Start here! Get your tokens and start playing in testnet!
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-4">
          {supportedTokens.map((token) => (
            <FaucetCard
              key={token.id}
              id={token.id}
              name={token.name}
              maxAmount={token.maxAmount}
              logoURI={token.logoURI}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faucet
