import { useEffect } from 'react'

import { useTronWeb } from '../contexts/TronWebContext'

import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import Alert from './Alert'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { connectTronLink } = useTronWeb()

  useEffect(() => {
    connectTronLink()
  }, [connectTronLink])

  return (
    <div className="min-h-screen">
      <Alert />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
