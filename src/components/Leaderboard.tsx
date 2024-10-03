'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type LeaderboardEntry = {
  rank: number
  name: string
  wasteCollected: number
  tokensEarned: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Waste Collected (kg)</TableHead>
            <TableHead>Tokens Earned</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map(entry => (
            <TableRow key={entry.rank}>
              <TableCell>{entry.rank}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.wasteCollected}</TableCell>
              <TableCell>{entry.tokensEarned}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}