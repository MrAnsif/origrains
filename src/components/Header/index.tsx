import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header } from 'src/payload-types'

import './index.css'
import { HeaderClient } from './index.client'

// Hardcoded nav items — always shown regardless of CMS content
const STATIC_NAV_ITEMS: NonNullable<Header['navItems']> = [
  {
    id: 'shop',
    link: {
      type: 'custom',
      label: 'Shop',
      url: '/shop',
      newTab: false,
    },
  },
  {
    id: 'account',
    link: {
      type: 'custom',
      label: 'Account',
      url: '/account',
      newTab: false,
    },
  },
]

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  // Merge: hardcoded items first, then any items added via CMS admin
  const merged: Header = {
    ...header,
    navItems: [...STATIC_NAV_ITEMS, ...(header.navItems || [])],
  }

  return <HeaderClient header={merged} />
}
