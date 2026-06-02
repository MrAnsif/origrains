import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import React, { Fragment } from 'react'

import { CheckoutPage } from '@/components/checkout/CheckoutPage'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

export default async function Checkout() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent('/checkout')}`)
  }

  return (
    <div className="container">
      <div className="mx-auto my-20">

        <h1 className="font-medium text-3xl">Checkout</h1>
        <CheckoutPage />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Checkout.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
  title: 'Checkout',
}
