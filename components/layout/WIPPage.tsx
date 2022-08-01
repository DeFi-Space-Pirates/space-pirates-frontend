import Link from 'next/link'

type WIPPageProps = {
  title?: string
  text?: string
}

const WIPPage = ({ title, text }: WIPPageProps) => {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
          {title ? (
            title
          ) : (
            <>
              <span className="block xl:inline">Page</span>{' '}
              <span className="block text-warning xl:inline">not ready ⚠️</span>
            </>
          )}
        </h1>
        <p className="mt-3 text-gray-500 sm:mt-5 sm:text-lg sm:max-w-3xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          {text ? (
            text
          ) : (
            <>
              The page is not ready but we&apos;re actively working on it. Check
              our progress on{' '}
              <a
                target="_blank"
                href="https://github.com/DeFi-Space-Pirates"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </a>
              !
            </>
          )}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md drop-shadow-md">
            <button className="btn btn-warning md:btn-lg btn-md px-8 py-3">
              <Link href="faucet">Read documentation</Link>
            </button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3 drop-shadow-md">
            <button className="btn btn-ghost md:btn-lg btn-md px-8 py-3">
              <a
                target="_blank"
                href="https://github.com/DeFi-Space-Pirates"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default WIPPage
