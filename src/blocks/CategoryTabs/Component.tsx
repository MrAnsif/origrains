import React from 'react'
import type { CategoryTabsBlock as CategoryTabsBlockProps } from '@/payload-types'
import { CategoryTabs } from '@/components/CategoryTabs'

export const CategoryTabsBlockComponent: React.FC<
  CategoryTabsBlockProps & {
    id?: string | number
    className?: string
  }
> = ({ heading, id }) => {
  return (
    <div className="container" id={id?.toString()}>
      {heading && <h2 className="text-2xl font-bold mb-4 text-center">{heading}</h2>}
      <CategoryTabs />
    </div>
  )
}
