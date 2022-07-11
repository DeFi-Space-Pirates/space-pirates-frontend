import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import TextSection from '../components/TextSection'
import roadMap from '../assets/roadMap.png'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto m-10 px-6 text-center py-20 min-h-screen overflow-hidden bg-slate-900 rounded-lg ">
      <Head>Space Pirates</Head>
      <TextSection />
      <div className="flex align  items-center justify-center p-10  ">
        <div className="w-90 rounded">
          <Image
            src={roadMap}
            className="object-cover rounded-xl"
            alt="road map"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
