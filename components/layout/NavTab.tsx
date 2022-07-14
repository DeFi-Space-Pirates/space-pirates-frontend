import Link from 'next/link'
import { useRouter } from 'next/router'

type NavTabProps = {
  page: 'trade' | 'earn'
}

const NavTab = ({ page }: NavTabProps) => {
  const router = useRouter()

  const tradeTabs = [
    { name: 'Swap', link: '/swap' },
    { name: 'Split', link: '/split' },
    { name: 'Convert', link: '/convert' },
  ]
  const earnTabs = [
    { name: 'Pools', link: '/pools' },
    { name: 'Staking', link: '/staking' },
  ]

  const tabs = page === 'trade' ? tradeTabs : earnTabs

  return (
    <div className="tabs h-15 tabs-boxed justify-center bg-base-100 shadow-lg rounded-t-md">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className={`tab md:tab-lg font-semibold ${
            router.pathname === tab.link && 'tab-active'
          }`}
        >
          <Link href={tab.link}>{tab.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default NavTab
