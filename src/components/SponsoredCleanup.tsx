import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SponsoredCleanupProps {
  sponsor: string
  date: string
  location: string
  reward: number
  onJoin: () => void
  buttonStyle?: string 
}

export default function SponsoredCleanup({ sponsor, date, location, reward, onJoin }: SponsoredCleanupProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sponsored Cleanup by {sponsor}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Date: {date}</p>
        <p>Location: {location}</p>
        <p>Reward: {reward} Eco-Tokens</p>
        <Button onClick={onJoin} className="mt-4">Join Cleanup</Button>
      </CardContent>
    </Card>
  )
}
