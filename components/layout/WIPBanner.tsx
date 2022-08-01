import InfoCircle from '../icons/InfoCircle'

const WIPBanner = () => {
  return (
    <div className="alert alert-sm alert-warning shadow-lg absolute top-20 left-2 md:w-56 sm:w-20 w-16">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 sm:h-6 sm:w-6 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="sm:text-md text-xs font-semibold">
          WIP!
          <span className="md:inline hidden">
            {' '}
            You can track our works on{' '}
            <a
              target="_blank"
              href="https://github.com/DeFi-Space-Pirates"
              rel="noopener noreferrer"
              className="underline"
            >
              GitHub
            </a>
            .
          </span>
        </span>
      </div>
    </div>
  )
}

export default WIPBanner
