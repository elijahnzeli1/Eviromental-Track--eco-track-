'use client'

import { SessionProvider } from "next-auth/react"
import { MagicProvider } from '@/components/MagicProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <MagicProvider>{children}</MagicProvider>
    </SessionProvider>
  )
}
