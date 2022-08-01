import { NextPage } from 'next'
import Head from 'next/head'
import WIPPage from '../../components/layout/WIPPage'

type MintProps = {}

const Mint: NextPage = (props: MintProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Mint</title>
      </Head>
      <WIPPage />
    </div>
  )
}

export default Mint
