'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, Trash2, Coins, TrendingUp, Send } from 'lucide-react'
import SponsoredCleanupComponent from '@/src/components/SponsoredCleanup'
import Navbar from '@/components/Navbar'
import { toast } from '@/components/ui/use-toast'
import { LineChart } from '@mui/x-charts/LineChart'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// Types
type SponsoredCleanup = {
  id: string
  sponsor: {
    name: string
  }
  date: string
  location: string
  reward: number
}

type UserStats = {
  tokensEarned: number
  wasteCollected: number
  rank: number
  activityHistory: {
    date: string
    wasteCollected: number
  }[]
}

type ChatMessage = {
  id: string
  user: string
  message: string
  timestamp: string
}

// Mock data for sponsored cleanups
const MOCK_SPONSORED_CLEANUPS: SponsoredCleanup[] = [
  {
    id: '1',
    sponsor: { name: 'EcoTech Solutions' },
    date: '2024-03-15',
    location: 'Central Park',
    reward: 500
  },
  {
    id: '2',
    sponsor: { name: 'Green Earth Initiative' },
    date: '2024-03-20',
    location: 'Riverside Beach',
    reward: 750
  },
  {
    id: '3',
    sponsor: { name: 'Sustainable Future' },
    date: '2024-03-25',
    location: 'Mountain Trail',
    reward: 600
  },
  {
    id: '4',
    sponsor: { name: 'Ocean Guardians' },
    date: '2024-03-30',
    location: 'Coastal Area',
    reward: 800
  }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [sponsoredCleanups, setSponsoredCleanups] = useState<SponsoredCleanup[]>(MOCK_SPONSORED_CLEANUPS)
  const [isLoading, setIsLoading] = useState(true)
  const [isStartingCollection, setIsStartingCollection] = useState(false)
  const [activeCollection, setActiveCollection] = useState<any>(null)
  const [userName, setUserName] = useState<string>('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return

      try {
        const response = await fetch(`/api/users/${session.user.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        setUserName(userData.name)
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast({
          title: "Error",
          description: "Failed to fetch user data",
          variant: "destructive",
        })
      }
    }

    const fetchUserStats = async () => {
      if (!session?.user?.id) return

      try {
        const response = await fetch(`/api/users/${session.user.id}/stats`)
        if (!response.ok) {
          throw new Error('Failed to fetch user stats')
        }
        const data = await response.json()
        
        // Generate activity history for the graph
        const activityHistory = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          wasteCollected: Math.floor(Math.random() * 10)
        }))

        setUserStats({ ...data, activityHistory })
      } catch (error) {
        console.error('Error fetching user stats:', error)
        toast({
          title: "Error",
          description: "Failed to fetch user stats. Please try again.",
          variant: "destructive",
        })
      }
    }

    const fetchActiveCollection = async () => {
      if (!session?.user?.id) return
      
      try {
        const response = await fetch(`/api/collections/active/${session.user.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch active collection')
        }
        const data = await response.json()
        setActiveCollection(data)
      } catch (error) {
        console.error('Error fetching active collection:', error)
      }
    }

    const fetchData = async () => {
      setIsLoading(true)
      if (status === "authenticated" && session?.user?.id) {
        await Promise.all([
          fetchUserData(),
          fetchUserStats(),
          fetchActiveCollection()
        ])
      }
      setIsLoading(false)
    }

    fetchData()
  }, [session, status])

  const startNewCollection = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to start a new collection.",
        variant: "destructive",
      })
      return
    }

    setIsStartingCollection(true)
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          title: `Collection ${new Date().toLocaleDateString()}`,
          description: 'New waste collection project',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start collection')
      }

      const data = await response.json()
      setActiveCollection(data)
      toast({
        title: "Success",
        description: "New collection project started successfully!",
      })
    } catch (error) {
      console.error('Error starting new collection:', error)
      toast({
        title: "Error",
        description: "Failed to start new collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsStartingCollection(false)
    }
  }

  const handleJoinCleanup = async (cleanupId: string) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to join a cleanup.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/cleanups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          cleanupId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to join cleanup')
      }

      toast({
        title: "Success",
        description: "Successfully joined the cleanup!",
      })
    } catch (error) {
      console.error('Error joining cleanup:', error)
      toast({
        title: "Error",
        description: "Failed to join cleanup. Please try again.",
        variant: "destructive",
      })
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: userName,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please sign in to view the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <Navbar />
      <div className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Hi there, {userName ? userName.split(' ')[0] : 'User'}! 👋
          </h2>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-green-600">Scale your self-esteem, one step at a time 🚀</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">Tokens Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Coins className="mr-2 h-6 w-6 text-yellow-500" />
                <span className="text-3xl font-bold">{userStats?.tokensEarned || 0}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">Waste Collected (kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Trash2 className="mr-2 h-6 w-6 text-green-500" />
                <span className="text-3xl font-bold">{userStats?.wasteCollected || 0}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-blue-500" />
                <span className="text-3xl font-bold">#{userStats?.rank || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
                            {userStats && (
                <LineChart
                  xAxis={[{ 
                    data: userStats.activityHistory.map(item => item.date),
                    scaleType: 'band',
                  }]}
                  series={[
                    {
                      data: userStats.activityHistory.map(item => item.wasteCollected),
                      area: true,
                      color: '#10B981',
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                />
              )}
            </CardContent>
            <CardContent>
              {userStats?.activityHistory && (
                <LineChart
                  xAxis={[{ 
                    data: userStats.activityHistory.map(item => item.date),
                    scaleType: 'band',
                  }]}
                  series={[
                    {
                      data: userStats.activityHistory.map(item => item.wasteCollected),
                      area: true,
                      color: '#10B981',
                    },
                  ]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                />
              )}
            </CardContent>
          </Card>

          {/* Real-time Activity Chat */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-green-600">Activity Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="mb-4">
                    <p className="font-semibold">{msg.user}</p>
                    <p>{msg.message}</p>
                    <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex mt-4">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={sendMessage} className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-green-600">Next Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="w-full h-4 bg-green-200" />
            <p className="mt-2 text-gray-600">75% towards your next milestone (100kg waste collected)</p>
          </CardContent>
        </Card>

        {/* Collection Button */}
        <div className="mb-8 flex justify-center">
          <Button 
            className="bg-green-600 text-white hover:bg-green-700 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={startNewCollection}
            disabled={isStartingCollection || activeCollection !== null}
          >
            {isStartingCollection ? 'Starting...' : activeCollection ? 'Collection in Progress' : 'Start New Collection'}
          </Button>
        </div>

        {/* Sponsored Cleanups */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-green-600">Sponsored Cleanups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsoredCleanups.map((cleanup) => (
              <SponsoredCleanupComponent
                key={cleanup.id}
                sponsor={cleanup.sponsor.name}
                date={cleanup.date}
                location={cleanup.location}
                reward={cleanup.reward}
                onJoin={() => handleJoinCleanup(cleanup.id)}
                buttonStyle="bg-green-600 text-white hover:bg-green-700" // Added button styling
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}