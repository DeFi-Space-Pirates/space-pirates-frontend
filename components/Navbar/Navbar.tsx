import Link from 'next/link'
import { useTronWeb } from '../../contexts/TronWebContext'
import formatAddress from '../../lib/formatAddress'
import NavbarLinks from './NavbarLinks'

const Navbar = () => {
  const { tronWeb, connectTronLink, address } = useTronWeb()

  return (
    <nav className="flex justify-center bg-base-100 shadow-lg">
      <div className="navbar max-w-screen-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavbarLinks />
            </ul>
          </div>
          <div className="btn btn-ghost normal-case text-xl">
            <Link href="/">Space Pirates</Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            <NavbarLinks />
          </ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn btn-primary"
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
                    fill="#27348b"
                    fillRule="evenodd"
                  />
                </svg>
              </>
            ) : (
              'Connect wallet'
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
