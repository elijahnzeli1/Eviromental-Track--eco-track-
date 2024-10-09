'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'
import { Session } from '@supabase/supabase-js'

const AuthContext = createContext<{ session: Session | null; loading: boolean }>({
  session: null,
  loading: true,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
