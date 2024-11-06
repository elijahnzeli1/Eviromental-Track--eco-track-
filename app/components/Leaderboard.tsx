"use client";

import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

interface User {
  id: string
  username: string
  tokensEarned: number
}

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard')
        const data = await response.json()
        
        if (!response.ok) throw new Error(data.error)
        setUsers(data)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch leaderboard data',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [toast])

  if (loading) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{index + 1}. {user.username}</span>
              <span>{user.tokensEarned} tokens</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
