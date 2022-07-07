import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAlert } from '../contexts/AlertContext'
import { useTronWeb } from '../contexts/TronWebContext'

const Home: NextPage = () => {
  const { toggleAlert } = useAlert()
  const { tronWeb, connectTronLink } = useTronWeb()

  useEffect(() => {
    connectTronLink()
  }, [connectTronLink])

  return (
    <div className="h-screen">
      <Head>
        <title>Space Pirates</title>
      </Head>
      <button
        className="btn"
        onClick={() => toggleAlert('Test Alert show', 'success')}
      >
        Hello daisyUI
      </button>
      <button
        className="btn btn-warning"
        onClick={async () =>
          console.log(
            await tronWeb.trx.getAccount('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'),
          )
        }
      >
        address
      </button>
    </div>
  )
}

export default Home
