import {
  Package, CupSoda, Milk, Baby, BatteryLow, Cable, Droplets, Banana, Utensils, Leaf, Box,
  FileText, Beer, Wine, Lightbulb, Wind, ShoppingBag, PackageOpen, Pill, Cigarette, SprayCan,
  Recycle, Home, TriangleAlert, ShieldAlert, Shapes, Globe, Sprout, Mountain, Waves, Flame,
  Fish, Bird, Minus, RefreshCw, Trash2, Tag, Store, ListChecks, Wrench, Users, Heart
} from 'lucide-react'

// Daftar ikon yang boleh dipakai di file JSON. Tambah ikon baru di sini.
export const ICONS = {
  Package, CupSoda, Milk, Baby, BatteryLow, Cable, Droplets, Banana, Utensils, Leaf, Box,
  FileText, Beer, Wine, Lightbulb, Wind, ShoppingBag, PackageOpen, Pill, Cigarette, SprayCan,
  Recycle, Home, TriangleAlert, ShieldAlert, Shapes, Globe, Sprout, Mountain, Waves, Flame,
  Fish, Bird, Minus, RefreshCw, Trash2, Tag, Store, ListChecks, Wrench, Users, Heart
}

export function Icon({ name, ...props }) {
  const C = ICONS[name] || Recycle
  return <C aria-hidden="true" {...props} />
}
