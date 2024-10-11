"use client";

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface User {
  id: string
  name: string
  score: number
}

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const { data, error } = await supabase
          .from('leaderboard')
          .select('id, name, score')
          .order('score', { ascending: false })
          .limit(5)

        if (error) throw error

        setUsers(data)
      } catch (e) {
        setError('Failed to fetch leaderboard data')
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{index + 1}. {user.name}</span>
              <span>{user.score} points</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
