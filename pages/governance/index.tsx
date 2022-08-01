import { NextPage } from 'next'
import Head from 'next/head'
import WIPPage from '../../components/layout/WIPPage'

type GovernanceProps = {}

const Governance: NextPage = (props: GovernanceProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Governance</title>
      </Head>
      <WIPPage
        title="Coming soon!"
        text="The page will be active when the protocol is mature and the tokens distributed!"
      />
    </div>
  )
}

export default Governance
