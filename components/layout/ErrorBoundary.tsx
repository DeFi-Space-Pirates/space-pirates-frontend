import Link from 'next/link'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Oops!</span>{' '}
              <span className="block text-error xl:inline">
                There is an error!
              </span>
            </h1>
            <p className="mt-3 text-gray-500 sm:mt-5 sm:text-lg sm:max-w-3xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"></p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md drop-shadow-md">
                <button
                  className="btn btn-warning md:btn-lg btn-md px-8 py-3"
                  onClick={() => this.setState({ hasError: false })}
                >
                  <Link href="/">Home</Link>
                </button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3 drop-shadow-md">
                <button
                  className="btn btn-ghost md:btn-lg btn-md px-8 py-3"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Try again?
                </button>
              </div>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
