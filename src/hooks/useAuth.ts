import { useState, useEffect } from 'react'
import { supabase } from '@/src/lib/supabase'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password })
  const signOut = () => supabase.auth.signOut()

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
  }
}