"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Calendar } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "City Park Cleanup",
    description: "Join us in cleaning up Central Park this weekend. Let's make our community greener!",
    date: "2023-07-15",
    participants: 50,
    category: "Cleanup",
  },
  {
    id: 2,
    title: "Recycling Workshop",
    description: "Learn proper recycling techniques and how to reduce waste in your daily life.",
    date: "2023-07-22",
    participants: 30,
    category: "Education",
  },
  {
    id: 3,
    title: "Tree Planting Initiative",
    description: "Help us plant 100 trees in the local community to combat climate change.",
    date: "2023-08-05",
    participants: 75,
    category: "Conservation",
  },
  // Add more projects as needed
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-600">Environmental Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                {project.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Badge variant="secondary" className="mb-2">
                {project.category}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {project.participants} participants
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Join Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

