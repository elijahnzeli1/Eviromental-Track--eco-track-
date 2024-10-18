'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, Trash2, Coins, TrendingUp } from 'lucide-react'
import SponsoredCleanupComponent from '@/src/components/SponsoredCleanup'
import Navbar from '@/components/Navbar'
import { createClient } from '@/src/lib/supabase'
import { useAuth } from '@/app/Providers'
import { toast } from '@/components/ui/use-toast'
import { LineChart } from '@mui/x-charts/LineChart'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from 'uuid'

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

export default function DashboardPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    tokensEarned: 0,
    wasteCollected: 0,
    rank: 0,
    activityHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      wasteCollected: 0
    }))
  })
  const [sponsoredCleanups, setSponsoredCleanups] = useState<SponsoredCleanup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isStartingCollection, setIsStartingCollection] = useState(false)
  const [activeCollection, setActiveCollection] = useState(null)
  const { session } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    const fetchUserStats: () => Promise<void> = async () => {
      if (!session?.user?.id) return

      try {
        const { data, error } = await supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', session.user.id)
          .single()

        if (error) throw error

        // Simulate activity history for the graph
        const activityHistory = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          wasteCollected: Math.floor(Math.random() * 10)
        }))

        setUserStats({ ...data, activityHistory } as UserStats)
      } catch (error) {
        console.error('Error fetching user stats:', error)
        toast({
          title: "Error",
          description: "Failed to fetch user stats. Please try again.",
          variant: "destructive",
        })
      }
    }

    const fetchSponsoredCleanups = async () => {
      try {
        const { data, error } = await supabase
          .from('sponsored_cleanups')
          .select('*')
          .order('date', { ascending: true })
          .limit(4)

        if (error) throw error

        setSponsoredCleanups(data as SponsoredCleanup[])
      } catch (error) {
        console.error('Error fetching sponsored cleanups:', error)
        toast({
          title: "Error",
          description: "Failed to fetch sponsored cleanups. Please try again.",
          variant: "destructive",
        })
      }
    }

    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([fetchUserStats(), fetchSponsoredCleanups()])
      setIsLoading(false)
    }

    fetchData()

    // Set up real-time subscription for user stats
    const userStatsSubscription = supabase
      .channel('user_stats_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_stats', filter: `user_id=eq.${session?.user?.id}` }, 
        (payload) => {
          setUserStats(payload.new as UserStats)
        }
      )
      .subscribe()

    const fetchActiveCollection = async () => {
      if (!session?.user?.id) return
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'in_progress')
        .single()

      if (data) {
        setActiveCollection(data)
      }
    }

    fetchActiveCollection()

    return () => {
      userStatsSubscription.unsubscribe()
    }
  }, [session, supabase])

  const startNewCollection = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to start a new collection.",
        variant: "destructive",
      });
      return;
    }

    setIsStartingCollection(true);
    try {
      const newProjectId = uuidv4();
      const { data, error } = await supabase
        .from('projects')
        .insert({
          id: newProjectId,
          user_id: session.user.id,
          start_time: new Date().toISOString(),
          status: 'in_progress',
          title: `Collection ${new Date().toLocaleDateString()}`,
          description: 'New waste collection project',
        })
        .select()
        .single();

      if (error) throw error;

      setActiveCollection(data)
      toast({
        title: "Success",
        description: "New collection project started successfully!",
      });

    } catch (error) {
      console.error('Error starting new collection:', error);
      toast({
        title: "Error",
        description: "Failed to start new collection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStartingCollection(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="mt-16"> {/* Added margin-top here */}
        <h1 className="text-3xl font-bold mb-6">Scale your self-esteem, one step at a time 🚀</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Tokens Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Coins className="mr-2 h-4 w-4 text-yellow-500" />
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
                <Trash2 className="mr-2 h-4 w-4 text-green-500" />
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
                <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">#{userStats.rank}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Next Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={75} className="w-full" />
            <p className="mt-2">75% towards your next milestone (100kg waste collected)</p>
          </CardContent>
        </Card>
        <div className="mb-8 flex justify-center">
          <Button 
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={startNewCollection}
            disabled={isStartingCollection || activeCollection !== null}
          >
            {isStartingCollection ? 'Starting...' : activeCollection ? 'Collection in Progress' : 'Start New Collection'}
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Sponsored Cleanups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsoredCleanups.map((cleanup: SponsoredCleanup) => (
              <SponsoredCleanupComponent
                key={cleanup.id}
                sponsor={cleanup.sponsor.name}
                date={cleanup.date}
                location={cleanup.location}
                reward={cleanup.reward}
                onJoin={() => console.log(`Joined ${cleanup.sponsor.name} cleanup`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
