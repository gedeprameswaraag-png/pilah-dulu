import { CATEGORIES } from '../config/site'

export default function CategoryBadge({ category }) {
  return <span className="badge" data-cat={category}>{CATEGORIES[category]?.label ?? category}</span>
}
