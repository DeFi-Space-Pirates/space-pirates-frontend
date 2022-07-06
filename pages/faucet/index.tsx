import type { NextPage } from 'next'
import Head from 'next/head'
import { useAlert } from '../../contexts/AlertContext'

const Home: NextPage = () => {
  const { toggleAlert } = useAlert()

  return (
    <div className="h-screen">
      <Head>
        <title>Space Pirates Faucet</title>
      </Head>
      <button
        className="btn"
        onClick={() => toggleAlert('Test Alert show', 'success')}
      >
        Hello daisyUI
      </button>
    </div>
  )
}

export default Home
