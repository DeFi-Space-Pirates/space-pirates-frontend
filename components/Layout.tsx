import Navbar from './Navbar'
import Footer from './Footer'
import Alert from './Alert'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-full">
      <Alert />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
