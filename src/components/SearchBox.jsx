import { forwardRef } from 'react'
import { Search, X } from 'lucide-react'

const SearchBox = forwardRef(function SearchBox({ value, onChange, onSubmit, placeholder = 'Coba: sachet kopi, baterai, popok…', big = false }, ref) {
  return (
    <form className={`search ${big ? 'search--big' : ''}`} role="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.(value) }}>
      <label className="sr-only" htmlFor="cari-barang">Cari nama barang</label>
      <Search size={big ? 26 : 20} className="search__icon" aria-hidden="true" />
      <input id="cari-barang" ref={ref} type="search" autoComplete="off" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange('')} aria-label="Hapus pencarian"><X size={18} /></button>
      )}
      {big && <button type="submit" className="btn btn--primary search__go">Cari</button>}
    </form>
  )
})
export default SearchBox
