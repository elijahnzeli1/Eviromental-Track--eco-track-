import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface User {
  id: string
  name: string
  score: number
}

const users: User[] = [
  { id: '1', name: 'Alice', score: 1500 },
  { id: '2', name: 'Bob', score: 1200 },
  { id: '3', name: 'Charlie', score: 1000 },
  { id: '4', name: 'David', score: 800 },
  { id: '5', name: 'Eve', score: 600 },
]

export function Leaderboard() {
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
