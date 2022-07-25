import { NextPage } from 'next'
import Head from 'next/head'
import QuestCategory from '../../components/Quest/QuestCategory'

type QuestProps = {}

const Quest: NextPage = (props: QuestProps) => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Quest</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold mb-2">Space Pirates Quest</p>
        <p className="text-xl italic">Complete quests and get rewards!</p>
      </div>
      <div className="flex flex-col gap-y-7 items-center justify-around">
        <QuestCategory
          tabIndex={1}
          title="Off-chain quests"
          description="Off-chain contests, social networks tasks, etc..."
          claimable={true}
        />
        <QuestCategory
          tabIndex={2}
          title="Achievements"
          description="In-game tasks"
          claimable={false}
        />
        <QuestCategory
          tabIndex={3}
          title="Server-wide achievements"
          description="Obtainable just once in the whole game: first place on tournaments, first in the game to..."
          claimable={false}
        />
        <QuestCategory
          tabIndex={4}
          title="Limited-time quests"
          description="Events-specific quests available for a restricted amount of time"
          claimable={false}
        />
        <QuestCategory
          tabIndex={5}
          title="Repetable quest"
          description="Quests that can be completed more than one time"
          claimable={true}
        />
      </div>
    </div>
  )
}

export default Quest
