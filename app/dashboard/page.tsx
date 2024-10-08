'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, Trash2, Coins } from 'lucide-react'

export default function DashboardPage() {
  const [userStats, setUserStats] = useState({
    tokensEarned: 0,
    wasteCollected: 0,
    rank: 0,
  })

  useEffect(() => {
    // Fetch user stats from API
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/user-stats');
        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchUserStats();
    setUserStats({
      tokensEarned: 150,
      wasteCollected: 75,
      rank: 42,
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tokens Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Coins className="mr-2 h-4 w-4" />
              <span className="text-2xl font-bold">{userStats.tokensEarned}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Waste Collected (kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Trash2 className="mr-2 h-4 w-4" />
              <span className="text-2xl font-bold">{userStats.wasteCollected}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="text-2xl font-bold">#{userStats.rank}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Next Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={75} className="w-full" />
          <p className="mt-2">75% towards your next milestone (100kg waste collected)</p>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-center">
        <Button className="bg-green-600 text-white hover:bg-green-700">Start New Collection</Button>
      </div>
    </div>
  )
}