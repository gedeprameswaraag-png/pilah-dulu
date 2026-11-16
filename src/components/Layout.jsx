import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a className="skip" href="#konten">Lewati ke konten</a>
      <Navbar />
      <main id="konten" key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
