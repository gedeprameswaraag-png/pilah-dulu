import items from '../data/items.json'
import sources from '../data/sources.json'

export const ALL_ITEMS = items
export const getItem = (id) => items.find((i) => i.id === id)
export const getSource = (id) => sources[id]

const norm = (s = '') => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()

// Cari berdasarkan nama utama, lalu sinonim, lalu bahan. Filter kategori ikut bekerja.
export function searchItems(query, category = 'semua') {
  const pool = category === 'semua' ? items : items.filter((i) => i.category === category)
  const q = norm(query)
  if (!q) return pool
  const tokens = q.split(/\s+/)
  return pool
    .map((item) => {
      const name = norm(item.name)
      const aliases = item.aliases.map(norm)
      const hay = [name, ...aliases].join(' ')
      let score = 0
      if (name === q) score = 100
      else if (name.startsWith(q)) score = 80
      else if (name.includes(q)) score = 60
      else if (aliases.includes(q)) score = 50
      else if (aliases.some((a) => a.includes(q))) score = 40
      else if (tokens.every((t) => hay.includes(t))) score = 30
      else if (norm(item.material).includes(q)) score = 10
      return { item, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item)
}
