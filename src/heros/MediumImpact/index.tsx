import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-[66vh] overflow-hidden">
      {/* Background Image & Gradient Overlay */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media
            className="w-full h-full"
            imgClassName="w-full h-full object-cover object-center"
            priority
            resource={media}
          />
          {/* Darker tone gradient at the bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      )}

      {/* Foreground Content (Centered over the image) */}
      <div className="relative z-10 container flex flex-col items-center justify-center text-center font-mono">
        {richText && (
          <RichText className="mb-6 drop-shadow-md" data={richText} enableGutter={false} />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4 mt-4">
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

      {/* Optional Caption (Pinned to the bottom if it exists) */}
      {media && typeof media === 'object' && media?.caption && (
        <div className="absolute bottom-6 z-10 w-full text-center text-white/80 text-sm">
          <div className="container">
            <RichText data={media.caption} enableGutter={false} />
          </div>
        </div>
      )}
    </div>
  )
}