'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/src/lib/supabase'
import { Session, SupabaseClient } from '@supabase/supabase-js'

const AuthContext = createContext<{ 
  session: Session | null; 
  loading: boolean;
  supabase: SupabaseClient;
}>({
  session: null,
  loading: true,
  supabase: {} as SupabaseClient, // This is a placeholder and will be overwritten
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase] = useState(() => createClient())

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  return (
    <AuthContext.Provider value={{ session, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)