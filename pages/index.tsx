import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAlert } from '../contexts/AlertContext'
import { useTronWeb } from '../contexts/TronWebContext'
import TextSection from '../components/TextSection'
import roadMap from "../assets/roadMap.png"

const Home: NextPage = () => {
  const { toggleAlert } = useAlert()
  const { tronWeb, connectTronLink } = useTronWeb()

  useEffect(() => {
    connectTronLink()
  }, [connectTronLink])

  return (
    // <div className="h-screen">
    //   <Head>
    //     <title>Space Pirates</title>
    //   </Head>
    //   <button
    //     className="btn"
    //     onClick={() => toggleAlert('Test Alert show', 'success')}
    //   >
    //     Hello daisyUI
    //   </button>
    //   <button
    //     className="btn btn-warning"
    //     onClick={async () =>
    //       console.log(
    //         await tronWeb.trx.getAccount('TTSFjEG3Lu9WkHdp4JrWYhbGP6K1REqnGQ'),
    //       )
    //     }
    //   >
    //     address
    //   </button>
    // </div>
    //    

    <div className="container mx-auto m-10  px-6 text-center py-20 min-h-screen overflow-hidden bg-slate-900 rounded-lg ">
      <TextSection />
      <div className='flex align  items-center justify-center p-10  '>
        <div className="w-90 rounded">
          <Image src={roadMap} className="object-cover  rounded-xl ..." alt='road map' />
        </div>
      </div>
    </div>

  )
}

export default Home
