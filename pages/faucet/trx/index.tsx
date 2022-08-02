import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import LoadingButton from '../../../components/layout/LoadingButton'
import CardContainer from '../../../components/Trade/CardContainer'
import { getAddress } from '../../../config/addresses'

import tokensList from '../../../config/constants/wrappedTokensList.json'
import { useAlert } from '../../../contexts/AlertContext'
import { useTronWeb } from '../../../contexts/TronWebContext'
import { convertToHex, getTronWebInstance } from '../../../lib/tronweb'
import { AddressesList } from '../../../typings/Tron'

type TRXFaucetProps = {}

const TRXFaucet: NextPage = (props: TRXFaucetProps) => {
  const [loading, setLoading] = useState(false)

  const { toggleAlert } = useAlert()
  const { address, tronWeb } = useTronWeb()

  const onGetTokens = async (symbol: string) => {
    setLoading(true)
    try {
      if (symbol === 'TRX') {
        await getTronWebInstance().trx.sendTransaction(
          address,
          '500000000',
          process.env.NEXT_PUBLIC_BANK_KEY,
        )

        localStorage.setItem(`${symbol}_MINTED`, '1')
      } else {
        const contractInstance = await tronWeb
          .contract()
          .at(getAddress(symbol as AddressesList, 'shasta'))

        await contractInstance.mint(address, convertToHex('500', 1e18)).send()

        localStorage.setItem(`${symbol}_MINTED`, '1')
      }
    } catch (err) {
      toggleAlert('Error while getting tokens', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates TRX Faucet</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Faucet</p>
        <p className="text-xl italic">
          Start here! Get your tokens and start playing in testnet!
        </p>
      </div>
      <div className="flex justify-center">
        {tokensList.unWrapped.map((token) => (
          <CardContainer
            key={token.address}
            title={token.symbol}
            subtitle={`Only one request per address is allowed`}
          >
            <LoadingButton
              customClasses="md:btn-md btn-xs"
              loading={loading}
              disabled={
                !(typeof window === 'undefined') &&
                localStorage.getItem(`${token.symbol}_MINTED`) === '1'
              }
              onClick={() => onGetTokens(token.symbol)}
            >
              <span className="md:mr-2">Get 500 testnet {token.symbol}</span>
              <div className="hidden md:inline">
                <Image
                  src={token.logoURI}
                  alt="token"
                  layout="fixed"
                  height={20}
                  width={20}
                />
              </div>
            </LoadingButton>
          </CardContainer>
        ))}
      </div>
      <p className="text-center text-2xl font-semibold mt-10">
        To mint more TRX go on the official{' '}
        <a
          href="https://www.trongrid.io/shasta"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Shasta faucet
        </a>
      </p>
    </div>
  )
}

export default TRXFaucet
