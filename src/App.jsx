import { useCallback, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'
import { VoiceProvider } from './components/VoiceContext'
import Home from './pages/Home'
import Pilah from './pages/Pilah'
import ItemDetail from './pages/ItemDetail'
import Belajar from './features/belajar/Belajar'
import { SITE } from './config/site'

// HashRouter dipakai agar mudah di-host di mana saja. Untuk URL bersih, ganti ke BrowserRouter
// dan atur fallback ke index.html di hosting.
export default function App() {
  const [ready, setReady] = useState(!SITE.loader.enabled)
  const done = useCallback(() => setReady(true), [])

  return (
    <VoiceProvider>
      {!ready && <Loader onDone={done} />}
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pilah" element={<Pilah />} />
            <Route path="pilah/:id" element={<ItemDetail />} />
            <Route path="belajar" element={<Belajar />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </HashRouter>
    </VoiceProvider>
  )
}
