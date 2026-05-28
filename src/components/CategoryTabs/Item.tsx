'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  href: string
  title: string
}

export function Item({ href, title }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = pathname === href
  const q = searchParams.get('q')
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mt-2 flex text-lg text-black dark:text-white bg-card rounded-md">
      <DynamicTag
        className={clsx(
          'w-full font-mono text-primary/80 px-2 py-1 rounded-md hover:bg-white/5 hover:text-primary',
          {
            'bg-white/5 text-primary': active,
          },
        )}
        href={href}
        prefetch={!active ? false : undefined}
      >
        {title}
      </DynamicTag>
    </li>
  )
}
