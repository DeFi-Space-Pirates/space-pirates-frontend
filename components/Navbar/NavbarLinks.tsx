import Link from 'next/link'
import ChevronDown from '../icons/ChevronDown'

const NavbarLinks = () => {
  return (
    <>
      <li tabIndex={0}>
        <a className="justify-between">
          Trade
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <Link href="swap">Swap</Link>
          </li>
          <li>
            <Link href="convert">Convert</Link>
          </li>
          <li>
            <Link href="split">Split</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={1}>
        <a className="justify-between">
          Earn
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <Link href="pools">Pools</Link>
          </li>
          <li>
            <Link href="staking">Staking</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={2}>
        <a className="justify-between">
          NFTs
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <Link href="marketplace">Marketplace</Link>
          </li>
          <li>
            <Link href="faucet">NFT mint</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={3}>
        <a className="justify-between">
          Quest
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <a>Claim</a>
          </li>
          <li>
            <a>List</a>
          </li>
        </ul>
      </li>
      <li>
        <a>Game</a>
      </li>
      <li tabIndex={4}>
        <a className="justify-between">
          Faucet
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <Link href="faucet">Tokens</Link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.trongrid.io/faucet"
              rel="noopener noreferrer"
            >
              Shasta faucet
            </a>
          </li>
        </ul>
      </li>
      <li tabIndex={5}>
        <a className="justify-between">
          Governance
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Vote</a>
          </li>
        </ul>
      </li>
      <li tabIndex={6}>
        <a className="justify-between">
          More
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-100 z-50 drop-shadow-md">
          <li>
            <Link href="wallet">Wallet</Link>
          </li>
          <li>
            <Link href="faucet">Tokens pre-sale</Link>
          </li>
          <li>
            <a>Wiki</a>
          </li>
          <li>
            <a>Inflation dashboard</a>
          </li>
        </ul>
      </li>
    </>
  )
}

export default NavbarLinks
