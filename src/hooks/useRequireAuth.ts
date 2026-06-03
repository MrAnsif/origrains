'use client'

import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Returns whether the current user is logged in, and a helper to redirect
 * them to the login page with an optional `?redirect=` return URL.
 */
export function useRequireAuth() {
  const { status } = useAuth()
  const router = useRouter()

  const isLoggedIn = status === 'loggedIn'

  const redirectToLogin = useCallback(
    (returnTo?: string) => {
      const params = returnTo ? `?redirect=${encodeURIComponent(returnTo)}` : ''
      router.push(`/login${params}`)
    },
    [router],
  )

  return { isLoggedIn, redirectToLogin }
}
