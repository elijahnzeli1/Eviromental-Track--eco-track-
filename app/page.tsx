'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/src/hooks/useAuth'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { user, signIn } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <Image src="/logo.svg" alt="Eco-Track Logo" width={200} height={200} className="animate-pulse" />
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-green-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to Eco-Track</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Join our community in making a positive impact on the environment while earning rewards!
      </p>
      <div className="flex gap-4">
        {user ? (
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
        <Link href="/about">
          <Button variant="outline">Learn More</Button>
        </Link>
      </div>
      <nav className="mt-8">
        <ul className="flex gap-4">
          <li><Link href="/map">Map</Link></li>
          <li><Link href="/marketplace">Marketplace</Link></li>
          <li><Link href="/community">Community</Link></li>
        </ul>
      </nav>
    </main>
  )
}