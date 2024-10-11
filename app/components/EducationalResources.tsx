import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const resources = [
  {
    id: '1',
    title: 'Waste Reduction Guide',
    description: 'Learn how to reduce waste in your daily life.',
    link: '/resources/waste-reduction'
  },
  {
    id: '2',
    title: 'Sustainable Living Tips',
    description: 'Practical tips for living a more sustainable lifestyle.',
    link: '/resources/sustainable-living'
  },
  {
    id: '3',
    title: 'Environmental Conservation Basics',
    description: 'An introduction to environmental conservation concepts.',
    link: '/resources/conservation-basics'
  }
]

export function EducationalResources() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <CardTitle>{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{resource.description}</CardDescription>
            <Link href={resource.link} className="text-blue-500 hover:underline">
              Learn more
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
