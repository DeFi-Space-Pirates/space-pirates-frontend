import { useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import QuestCategory from '../../components/Quest/QuestCategory'
import QuestItem from '../../components/Quest/QuestItem'
import { addresses } from '../../config/addresses'
import { useTronWeb } from '../../contexts/TronWebContext'
import { Quest } from '../../typings/Quest'
import {
  getSignature,
  achievementsQuests,
  limitedTimeQuests,
  offGameQuests,
  repeatableQuests,
  serverWideQuests,
} from '../../lib/quest'

type QuestProps = {}

const Quests: NextPage = (props: QuestProps) => {
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
          title="Off-game quests"
          description="Off-game contests, social networks tasks, etc..."
          claimable={false}
        >
          {offGameQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          title="Achievements"
          description="In-game tasks"
          claimable={false}
        >
          {achievementsQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          title="Server-wide achievements"
          description="Obtainable just once in the whole game: first place on tournaments, first in the game to..."
          claimable={false}
        >
          {serverWideQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          title="Limited-time quests"
          description="Events-specific quests available for a restricted amount of time"
          claimable={false}
        >
          {limitedTimeQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          title="Repetable quest"
          description="Quests that can be completed more than one time"
          claimable={false}
        >
          {repeatableQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
      </div>
    </div>
  )
}

export default Quests
