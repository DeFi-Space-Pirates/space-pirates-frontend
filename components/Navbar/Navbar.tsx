import Link from 'next/link'
import { useTronWeb } from '../../contexts/TronWebContext'
import formatAddress from '../../lib/formatAddress'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const { tronWeb, connectTronLink, address } = useTronWeb()

  return (
    <nav className="flex justify-center bg-base-200">
      <div className="navbar max-w-screen-2xl p-0 mx-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
            >
              <button className="btn btn-ghost normal-case text-xl sm:hidden inline">
                <Link href="/">Space Pirates</Link>
              </button>
              <NavbarLinks />
            </ul>
          </div>
          <button className="btn btn-ghost normal-case text-xl sm:inline hidden">
            <Link href="/">Space Pirates</Link>
          </button>
        </div>
        <div className="navbar-center hidden xl:flex">
          <ul className="menu menu-horizontal p-0">
            <NavbarLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn md:btn-md btn-sm btn-primary text-content-primary"
              onClick={tronWeb ? () => {} : () => connectTronLink()}
            >
              {tronWeb ? (
                <>
                  <p className="mr-2">{formatAddress(address)}</p>
                  <svg
                    id="Livello_1-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.212"
                    height="15.783"
                    viewBox="0 0 16.212 15.783"
                  >
                    <path
                      id="Tracciato_3"
                      data-name="Tracciato 3"
                      d="M16.212,4.383,3.629,2.133l9,7.25,3.581-2.9V8.4l-1.7,1.411,1.7-.309v1.5l-2.871.517-.517,4.258H11.572l.585-4.832L2.775,3.2,7.8,15.783H6.283L0,0,16.212,2.979Z"
                      fill="#FFF7E8"
                      fillRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <p>
                  Connect <span className="hidden md:inline">Wallet</span>
                </p>
              )}
            </button>
            {tronWeb && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 drop-shadow-md bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="wallet">Wallet</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
