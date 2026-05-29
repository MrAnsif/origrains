'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'sonner'

type Props = {
  productId: number
  productSlug: string
  enableVariants?: boolean | null
  inventory?: number | null
}

export function AddToCartGridButton({ productId, productSlug, enableVariants, inventory }: Props) {
  const { addItem, cart, isLoading } = useCart()

  const isInCartAtMax = useMemo(() => {
    if (enableVariants) return false

    const existingItem = cart?.items?.find((item) => {
      const pid = typeof item.product === 'object' ? item.product?.id : item.product
      return pid === productId
    })

    if (existingItem) {
      return existingItem.quantity >= (inventory ?? 0)
    }

    return (inventory ?? 0) === 0
  }, [cart?.items, enableVariants, inventory, productId])

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent the parent <Link> from navigating when the button is clicked
      e.preventDefault()
      e.stopPropagation()

      addItem({ product: productId }).then(() => {
        toast.success('Item added to cart.')
      })
    },
    [addItem, productId],
  )

  // Variant products need the detail page for option selection
  if (enableVariants) {
    return (
      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-full mt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <Link href={`/products/${productSlug}`}>View Options</Link>
      </Button>
    )
  }

  const outOfStock = (inventory ?? 0) === 0

  return (
    <Button
      aria-label="Add to cart"
      variant="outline"
      size="sm"
      className="w-full mt-3"
      disabled={isInCartAtMax || isLoading || outOfStock}
      onClick={handleAddToCart}
      type="button"
    >
      {outOfStock ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  )
}
