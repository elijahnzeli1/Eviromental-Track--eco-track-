import React, { useState, useEffect } from 'react'
import { useMagic } from '@/components/MagicProvider'

const achievements = [
  { id: 1, name: 'First Cleanup', description: 'Participate in your first cleanup event' },
  { id: 2, name: 'Token Master', description: 'Earn 100 Eco-Tokens' },
  { id: 3, name: 'Eco Warrior', description: 'Participate in 10 cleanup events' },
  { id: 4, name: 'Green Influencer', description: 'Refer 5 friends to join the platform' },
  { id: 5, name: 'Recycling Champion', description: 'Recycle 100 items through the platform' },
  { id: 6, name: 'Carbon Footprint Reducer', description: 'Reduce your carbon footprint by 20%' },
  { id: 7, name: 'Sustainable Shopper', description: 'Make 10 purchases from eco-friendly vendors' },
  //Add more achievements
]

export default function UserAchievements() {
  const { user } = useMagic()
  const [userAchievements, setUserAchievements] = useState<any[]>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/achievements?userId=${user.issuer}`)
          if (response.ok) {
            const data = await response.json()
            setUserAchievements(data.achievements)
          } else {
            console.error('Failed to fetch achievements')
          }
        } catch (error) {
          console.error('Error fetching achievements:', error)
        }
      }
    }

    fetchAchievements()
  }, [user])

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="border p-4 rounded">
            <h3 className="font-semibold">{achievement.name}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
