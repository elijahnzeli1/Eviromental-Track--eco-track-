import React from 'react'
import { CommunityEvents } from '@/app/components/CommunityEvents'
import { GroupChat } from '@/app/components/GroupChat'
import { Leaderboard } from '@/app/components/Leaderboard'
import { EducationalResources } from '@/app/components/EducationalResources'

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <CommunityEvents />
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
