'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import type { Theme } from '../types'
import { useTheme } from '..'
import { themeLocalStorageKey } from '../shared'

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [value, setValue] = useState('')
  const [mounted, setMounted] = useState(false)

  const onThemeChange = (themeToSet: Theme | 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a matching placeholder during SSR to prevent hydration shifts
    return (
      <div className="w-11 h-6 rounded-full bg-muted border border-border animate-pulse" />
    )
  }

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    onThemeChange(nextTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex h-6 w-11 cursor-pointer items-center rounded-full border border-primary/20 p-0.5 transition-colors duration-300 hover:brightness-95 dark:hover:brightness-110 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Toggle theme (currently ${theme})`}
      role="switch"
      aria-checked={isDark}
    >
      <div
        className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-primary-foreground shadow-[0_1.5px_3px_rgba(0,0,0,0.1)] dark:shadow-[0_1.5px_3px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out group-hover:scale-105 ${
          isDark ? 'translate-x-5' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-primary stroke-[2]" />
        ) : (
          <Sun className="h-3 w-3 text-primary stroke-[2]" />
        )}
      </div>
    </button>
  )
}


