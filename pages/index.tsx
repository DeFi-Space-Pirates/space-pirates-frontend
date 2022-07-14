import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto h-screen">
      <Head>Space Pirates</Head>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Space Pirates</span>{' '}
            <span className="block text-primary xl:inline">
              with low slippage
            </span>
          </h1>
          <p className="mt-3 text-gray-500 sm:mt-5 sm:text-lg sm:max-w-3xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Create your team of fighting creatures to fight pirates and explore
            floating islands. Conquer a land on and settle down your base.
            Collect all the objects around the space to obtain the rarest title
            in the galaxy.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md drop-shadow-md">
              <button className="btn btn-primary md:btn-lg btn-md px-8 py-3">
                <Link href="swap">Start here</Link>
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 drop-shadow-md">
              <button className="btn btn-base-200 md:btn-lg btn-md px-8 py-3">
                <Link href="swap">Read documentation</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
