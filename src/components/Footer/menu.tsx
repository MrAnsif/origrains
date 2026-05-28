import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import React from 'react'

interface Props {
  menu: Footer['navItems']
}

export function FooterMenu({ menu }: Props) {
  if (!menu?.length) return null

  return (
    <nav>
      <ul>
        <h3 className="mb-3 font-semibold text-foreground">Quick Links</h3>
        {menu.map((item) => {
          return (
            <li key={item.id} >
              <CMSLink appearance="link" className='text-md font-light' {...item.link} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
