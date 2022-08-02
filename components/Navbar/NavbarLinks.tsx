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
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/swap">Swap</Link>
          </li>
          <li>
            <Link href="/convert">Convert</Link>
          </li>
          <li>
            <Link href="/split">Split</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={1}>
        <a className="justify-between">
          Earn
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/pools">Pools</Link>
          </li>
          <li>
            <Link href="/staking">Staking</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={2}>
        <a className="justify-between">
          NFTs
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/mint">Mint</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/game">Game</Link>
      </li>
      <li>
        <Link href="/quest">Quest</Link>
      </li>
      <li tabIndex={2}>
        <a className="justify-between">
          Faucet
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/faucet">Space faucet</Link>
          </li>
          <li>
            <Link href="/faucet/trx">TRX faucet</Link>
          </li>
        </ul>
      </li>

      <li tabIndex={5}>
        <a className="justify-between">
          Governance
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/governance">Dashboard</Link>
          </li>
          <li>
            <Link href="/governance/vote">Vote</Link>
          </li>
        </ul>
      </li>
      <li tabIndex={6}>
        <a className="justify-between">
          More
          <ChevronDown />
        </a>
        <ul className="p-2 bg-base-200 z-50 drop-shadow-md">
          <li>
            <Link href="/wallet">Wallet</Link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://docs.space-pirates-testnet.com/"
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </li>
          <li>
            <Link href="/presale">Tokens pre-sale</Link>
          </li>
          <li>
            <Link href="/inflation">Inflation dashboard</Link>
          </li>
        </ul>
      </li>
    </>
  )
}

export default NavbarLinks
