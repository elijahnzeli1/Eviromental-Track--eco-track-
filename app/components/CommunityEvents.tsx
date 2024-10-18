import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

interface Event {
  id: string
  title: string
  description: string
  date: string
  type: 'cleanup' | 'workshop' | 'webinar'
}

const events: Event[] = [
  {
    id: '1',
    title: 'Beach Cleanup',
    description: 'Join us for a beach cleanup event!',
    date: '2023-07-15',
    type: 'cleanup'
  },
  {
    id: '2',
    title: 'Recycling Workshop',
    description: 'Learn about proper recycling techniques.',
    date: '2023-07-22',
    type: 'workshop'
  },
  {
    id: '3',
    title: 'Environmental Conservation Webinar',
    description: 'Online session about environmental conservation.',
    date: '2023-07-29',
    type: 'webinar'
  }
]

interface CommunityEventsProps {
  events: Event[];
}

export function CommunityEvents({ events }: CommunityEventsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
          <CardFooter>
            <Button className='bg-green-500 hover:bg-green-600'>Join Event</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
