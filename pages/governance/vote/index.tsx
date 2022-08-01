import { NextPage } from 'next'
import Head from 'next/head'
import WIPPage from '../../../components/layout/WIPPage'

type GovernanceVoteProps = {}

const GovernanceVote: NextPage = (props: GovernanceVoteProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Vote</title>
      </Head>
      <WIPPage
        title="Coming soon!"
        text="The page will be active when the protocol is mature and the tokens distributed!"
      />
    </div>
  )
}

export default GovernanceVote
