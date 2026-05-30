'use client'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'

import { Price } from '@/components/Price'

type Props = {
  amount: number
  position?: 'bottom' | 'center'
  title: string
}

export const Label: React.FC<Props> = ({ amount, position = 'bottom', title }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [scrollDistance, setScrollDistance] = useState(0)

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const textWidth = textRef.current.scrollWidth

        if (textWidth > containerWidth) {
          setIsOverflowing(true)
          // Calculate distance plus a little padding so it doesn't clip immediately
          setScrollDistance(textWidth - containerWidth + 16) 
        } else {
          setIsOverflowing(false)
        }
      }
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [title])

  return (
    <div
      className={clsx(
        'absolute left-0 flex w-full @container/label',
        // Premium edge-to-edge glass effect
        'bottom-0 bg-gradient-to-t from-black/70 to-black/0 backdrop-blur-l p-4 transition-all duration-300',
        {
          'bottom-1/2 translate-y-1/2 border-y': position === 'center',
        }
      )}
    >
      <div className="flex items-center justify-between w-full gap-6">
        
        {/* Title Container: Fills remaining space, hides overflow for the marquee */}
        <div 
          ref={containerRef}
          className="flex-1 min-w-0 overflow-hidden relative mask-image-fade"
        >
          <h3
            ref={textRef}
            className="text-sidebar-primary-foreground text-lg font-medium tracking-tight whitespace-nowrap"
            style={
              isOverflowing
                ? {
                    animation: `scrollTitle ${scrollDistance * 25}ms linear infinite alternate`,
                    '--scroll-dist': `-${scrollDistance}px`,
                  } as React.CSSProperties
                : {}
            }
          >
            {title}
          </h3>

          {isOverflowing && (
            <style>{`
              @keyframes scrollTitle {
                0%, 15% { transform: translateX(0); }
                85%, 100% { transform: translateX(var(--scroll-dist)); }
              }
            `}</style>
          )}
        </div>

        {/* Price Tag: Sleek, high-contrast, modern rectangle instead of a bubble */}
        <Price
          amount={amount}
          className="flex-none px-3 py-1.5 text-sm font-bold text-sidebar-primary-foreground shadow-sm"
          currencyCodeClassName="opacity-70 ml-1 hidden @[275px]/label:inline"
        />
      </div>
    </div>
  )
}