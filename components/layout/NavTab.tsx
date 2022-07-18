import Link from 'next/link'
import { useRouter } from 'next/router'

type NavTabProps = {
  page: 'trade' | 'earn'
}

const NavTab = ({ page }: NavTabProps) => {
  const router = useRouter()

  const tradeTabs = [
    { name: 'Swap', link: '/swap' },
    { name: 'Convert', link: '/convert' },
    { name: 'Split', link: '/split' },
  ]
  const earnTabs = [
    { name: 'Pools', link: '/pools' },
    { name: 'Staking', link: '/staking' },
  ]

  const tabs = page === 'trade' ? tradeTabs : earnTabs

  return (
    <div className="tabs h-15 justify-center bg-base-100 rounded-t-md p-4">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`tab tab-bordered font-semibold mx-4 ${
            router.pathname === tab.link ? 'tab-active' : ''
          }`}
        >
          <Link href={tab.link}>{tab.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default NavTab
