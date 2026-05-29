import type { Product } from '@/payload-types'

import Link from 'next/link'
import React, { Suspense } from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { AddToCartGridButton } from '@/components/Cart/AddToCartGridButton'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title, id, inventory, enableVariants, slug } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <div className="relative flex flex-col h-full w-full group">
      <Link className="flex-1" href={`/products/${slug}`}>
        {image ? (
          <Media
            className={clsx(
              'relative aspect-square object-cover border rounded-2xl p-8 bg-primary-foreground',
            )}
            height={80}
            imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
              'transition duration-300 ease-in-out group-hover:scale-102': true,
            })}
            resource={image}
            width={80}
          />
        ) : null}

        <div className="font-mono text-primary/50 group-hover:text-primary flex justify-between items-center mt-4">
          <div>{title}</div>

          {typeof price === 'number' && (
            <div>
              <Price amount={price} />
            </div>
          )}
        </div>
      </Link>

      {id && slug && (
        <Suspense fallback={null}>
          <AddToCartGridButton
            productId={id}
            productSlug={slug}
            enableVariants={enableVariants}
            inventory={inventory}
          />
        </Suspense>
      )}
    </div>
  )
}
