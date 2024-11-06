'use client'

import { createContext, useContext } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { ThemeProvider } from './ThemeProvider'

// Create an auth context for our application
const AuthContext = createContext<{
  session: any;
  loading: boolean;
}>({
  session: null,
  loading: true,
})

// Create a wrapper component for NextAuth's SessionProvider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Main Providers component that wraps our application
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
