import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { LogoIcon } from '@/components/icons/logo'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const menu = footer.navItems || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  
  // Updated skeleton to use the CSS variable-driven muted background
  const skeleton = 'w-full h-6 animate-pulse rounded bg-muted'

  const copyrightName = COMPANY_NAME || SITE_NAME || ''
  const displaySiteName = SITE_NAME || 'UFA DISTRO'

  return (
    <footer className="relative flex h-[43vh] md:min-h-[66vh] flex-col justify-end overflow-hidden bg-background text-sm text-muted-foreground">
      
      {/* Background Fading Text */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-start justify-center pt-8 md:pt-16">
        <span 
          className="bg-gradient-to-b from-foreground/10 to-transparent bg-clip-text text-[18.9vw] font-black uppercase leading-none tracking-tighter text-transparent"
          aria-hidden="true"
        >
          {displaySiteName}
        </span>
      </div>

      {/* Main Footer Content */}
      <div className="container relative z-10">
        <div className="flex w-full flex-col gap-6 py-12 text-sm md:flex-row md:gap-12">
          <div className="md:max-w-[300px]">
            <Link className="flex items-center gap-2 text-foreground md:pt-1" href="/">
              <LogoIcon className="w-6" />
              <span className="text-lg font-semibold tracking-wide uppercase">{displaySiteName}</span>
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {displaySiteName} offers a comprehensive selection of products. Our inventory boasts a diverse range to meet all your needs.
            </p>
          </div>
          
          <div className="flex-1">
            <Suspense
              fallback={
                <div className="flex h-[188px] w-[200px] flex-col gap-2">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menu} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative z-10 border-t border-border py-6 text-sm">
        <div className="container mx-auto flex w-full flex-col items-center gap-1 md:flex-row md:gap-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}