"use client"

import React, { useState, useEffect } from 'react'
import { CommunityEvents } from '@/app/components/CommunityEvents'
import { GroupChat } from '@/app/components/GroupChat'
import { Leaderboard } from '@/app/components/Leaderboard'
import { EducationalResources } from '@/app/components/EducationalResources'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

interface CustomEvent {
  title: string;
  description: string;
  date: string;
  type: string;
}

export default function CommunityPage() {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState<CustomEvent>({
    title: '',
    description: '',
    date: '',
    type: 'cleanup'
  })
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      })
    }
  }

  async function createEvent() {
    if (!session) {
      toast({
        title: 'Error',
        description: 'Please log in to create an event',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEvent,
          creatorId: session.user.id
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      toast({
        title: 'Success',
        description: 'Event created successfully!',
      })
      
      fetchEvents()
      setNewEvent({
        title: '',
        description: '',
        date: '',
        type: 'cleanup'
      })
    } catch (error) {
      console.error('Error creating event:', error)
      toast({
        title: 'Error',
        description: 'Failed to create event',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community</h1>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">Create Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <Select
                  onValueChange={(value) => setNewEvent({ ...newEvent, type: value as CustomEvent['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cleanup">Cleanup</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={createEvent}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CommunityEvents events={events} />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Group Chat</h2>
        <GroupChat />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <Leaderboard />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Educational Resources</h2>
        <EducationalResources />
      </section>
    </div>
  )
}
