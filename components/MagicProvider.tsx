'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { MagicUserMetadata } from 'magic-sdk'
import { magic } from '@/lib/magic'

interface MagicContextType {
  user: MagicUserMetadata | null
  login: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const MagicContext = createContext<MagicContextType | null>(null)

export const useMagic = () => {
  const context = useContext(MagicContext)
  if (!context) {
    throw new Error('useMagic must be used within a MagicProvider')
  }
  return context
}

export function MagicProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MagicUserMetadata | null>(null)

  useEffect(() => {
    magic?.user.isLoggedIn().then(async (isLoggedIn) => {
      if (isLoggedIn) {
        const userData = await magic?.user.getMetadata()
        if (userData) {
          setUser(userData)
        }
      }
    })
  }, [])

  const login = async (email: string) => {
    await magic?.auth.loginWithMagicLink({ email })
    const userData = await magic?.user.getMetadata()
    if (userData) {
      setUser(userData)
    }
  }

  const logout = async () => {
    await magic?.user.logout()
    setUser(null)
  }

  return (
    <MagicContext.Provider value={{ user, login, logout }}>
      {children}
    </MagicContext.Provider>
  )
}
