import { NextPage } from 'next'
import Head from 'next/head'
import WIPPage from '../../components/layout/WIPPage'

type GameProps = {}

const Game: NextPage = (props: GameProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Game</title>
      </Head>
      <WIPPage />
    </div>
  )
}

export default Game
