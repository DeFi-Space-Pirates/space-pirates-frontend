import { useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import QuestCategory from '../../components/Quest/QuestCategory'
import QuestItem from '../../components/Quest/QuestItem'
import { addresses } from '../../config/addresses'
import { useTronWeb } from '../../contexts/TronWebContext'
import { Quest } from '../../typings/Quest'
import { getSignature } from '../../lib/quest'

type QuestProps = {}

let offGameQuests: Quest[] = [
  {
    questName: 'Explore website',
    ids: [1],
    amounts: [100],
  },
  {
    questName: 'Mint from faucet',
    ids: [1],
    amounts: [250],
  },
]

let achievementsQuests: Quest[] = [
  {
    questName: 'Collect 1 NFTs',
    ids: [2],
    amounts: [150],
  },
  {
    questName: 'Collect 5 NFTs',
    ids: [2],
    amounts: [150],
  },
  {
    questName: 'Collect 10 NFTs',
    ids: [2],
    amounts: [150],
  },
  {
    questName: 'Collect 15 NFTs',
    ids: [2],
    amounts: [150],
  },
  {
    questName: 'Collect 20 NFTs',
    ids: [2],
    amounts: [150],
  },
  {
    questName: 'Collect 25 NFTs',
    ids: [2],
    amounts: [100],
  },
  {
    questName: 'Awake an NFT to level 1',
    ids: [2],
    amounts: [200],
  },
  {
    questName: 'Awake an NFT to level 2',
    ids: [2],
    amounts: [200],
  },
  {
    questName: 'Awake an NFT to level 3',
    ids: [2],
    amounts: [200],
  },
  {
    questName: 'Awake an NFT to level 4',
    ids: [2],
    amounts: [200],
  },
  {
    questName: 'Awake an NFT to level 5',
    ids: [2],
    amounts: [200],
  },
  {
    questName: 'Awake an NFT to level 6',
    ids: [2],
    amounts: [200],
  },
]

let serverWideQuests: Quest[] = [
  {
    questName: 'Get 1st place in the first-season tournament',
    ids: [2],
    amounts: [10000],
  },
]

let limitedTimeQuests: Quest[] = [
  {
    questName: 'Score 10000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
  },
  {
    questName: 'Score 20000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
  },
  {
    questName: 'Score 30000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
  },
  {
    questName: 'Score 40000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
  },
  {
    questName: 'Score 50000 point in the special Christmas event',
    ids: [2],
    amounts: [5000],
  },
]

let repeatableQuests: Quest[] = [
  {
    questName: 'Participate in 50 PvP battles in one month',
    ids: [1],
    amounts: [7500],
  },
  {
    questName: 'Participate in 100 PvP battles in one month',
    ids: [1],
    amounts: [7500],
  },
  {
    questName: 'Participate in 150 PvP battles in one month',
    ids: [1],
    amounts: [7500],
  },
  {
    questName: 'Participate in 200 PvP battles in one month',
    ids: [1],
    amounts: [7500],
  },
  {
    questName: 'Participate in 250 PvP battles in one month',
    ids: [1],
    amounts: [7500],
  },
]

const Quest: NextPage = (props: QuestProps) => {
  // const { tronWeb, address } = useTronWeb()

  // const test = useCallback(async () => {
  //   const signature = await getSignature(
  //     tronWeb.defaultAddress?.hex!,
  //     quests[0],
  //   )

  //   const events = await tronWeb.getEventResult(
  //     addresses.shasta.questRedeemContract,
  //     {
  //       sinceTimestamp: 0,
  //       eventName: 'QuestClaim',
  //       onlyConfirm: true,
  //       filter: {
  //         from: address,
  //       },
  //     },
  //   )

  //   console.log(events)
  // }, [address, tronWeb])

  // useEffect(() => {
  //   tronWeb && test()
  // }, [tronWeb, test])

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
          title="Off-game quests"
          description="Off-game contests, social networks tasks, etc..."
          claimable={false}
        >
          {offGameQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          tabIndex={2}
          title="Achievements"
          description="In-game tasks"
          claimable={false}
        >
          {achievementsQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          tabIndex={3}
          title="Server-wide achievements"
          description="Obtainable just once in the whole game: first place on tournaments, first in the game to..."
          claimable={false}
        >
          {serverWideQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          tabIndex={4}
          title="Limited-time quests"
          description="Events-specific quests available for a restricted amount of time"
          claimable={false}
        >
          {limitedTimeQuests.map((quest) => (
            <QuestItem key={quest.questName} quest={quest} />
          ))}
        </QuestCategory>
        <QuestCategory
          tabIndex={5}
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

export default Quest
