import { useEffect } from 'react'

import { useTronWeb } from '../../contexts/TronWebContext'

import Navbar from '../Navbar/Navbar'
import Footer from './Footer'
import Alert from './Alert'

type LayoutProps = {
  children: React.ReactNode
  padding?: number
}

const Layout = ({ children, padding = 5 }: LayoutProps) => {
  const { connectTronLink } = useTronWeb()

  useEffect(() => {
    connectTronLink()
  }, [connectTronLink])

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Alert />
      <Navbar />
      <main className={`max-w-screen-2xl self-center mb-auto p-${padding}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
