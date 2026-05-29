'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative flex items-center w-full h-screen min-h-[600px] overflow-hidden "
      data-theme="dark"
    >
      <div className="absolute top-0 left-0 bg-black/25 h-screen w-full z-10"></div>
      {/* Background Media Container (Perfectly Centered) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none">
        {media && typeof media === 'object' && (
          <Media 
            fill 
            imgClassName="object-cover object-center w-full h-full" 
            className=''
            priority 
            resource={media} 
          />
        )}
      </div>

      {/* Foreground Text Container (Left Aligned) */}
      <div className="container relative z-10 px-4 md:px-8 xl:px-0 ">
        <div className="max-w-2xl text-left font-mono">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4 justify-start">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}