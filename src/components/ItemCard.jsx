import { Link } from 'react-router-dom'
import { Icon } from '../utils/icons'
import CategoryBadge from './CategoryBadge'
import { RECYCLING } from '../config/site'

// Kartu label: nama barang, kategori, status penanganan.
export default function ItemCard({ item, compact = false }) {
  const r = RECYCLING[item.recycling]
  return (
    <Link to={`/pilah/${item.id}`} className={`item-card ${compact ? 'item-card--compact' : ''}`} data-cat={item.category}>
      <span className="item-card__icon"><Icon name={item.icon} size={22} /></span>
      <span className="item-card__body">
        <span className="item-card__name">{item.name}</span>
        <span className="item-card__meta">
          <CategoryBadge category={item.category} />
          <span className={`status status--${r.tone}`}>{r.label}</span>
        </span>
      </span>
    </Link>
  )
}
