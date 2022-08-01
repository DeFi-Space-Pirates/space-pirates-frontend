import { NextPage } from 'next'
import Head from 'next/head'
import WIPPage from '../../components/layout/WIPPage'

type PresaleProps = {}

const Presale: NextPage = (props: PresaleProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Presale</title>
      </Head>
      <WIPPage />
    </div>
  )
}

export default Presale
