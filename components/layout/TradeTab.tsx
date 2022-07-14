import Link from 'next/link'
import { useRouter } from 'next/router'

type TradeTabProps = {}

const TradeTab = ({}: TradeTabProps) => {
  const router = useRouter()

  return (
    <div className="tabs h-15 tabs-boxed justify-center bg-base-100 shadow-lg rounded-t-md">
      <div
        className={`tab md:tab-lg font-semibold ${
          router.pathname === '/swap' && 'tab-active'
        }`}
      >
        <Link href="/swap">Swap</Link>
      </div>
      <div
        className={`tab md:tab-lg font-semibold ${
          router.pathname === '/split' && 'tab-active'
        }`}
      >
        <Link href="/split">Split</Link>
      </div>
      <div
        className={`tab md:tab-lg font-semibold ${
          router.pathname === '/convert' && 'tab-active'
        }`}
      >
        <Link href="/convert">Convert</Link>
      </div>
    </div>
  )
}

export default TradeTab
