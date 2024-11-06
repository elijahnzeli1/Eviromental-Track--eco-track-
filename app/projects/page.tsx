"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Calendar, Plus } from "lucide-react"
import { useSession } from 'next-auth/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast'

interface Project {
  _id: string
  title: string
  description: string
  date: string
  participants: number
  category: string
  creatorId: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Partial<Project>>({})
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      setProjects(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    }
  }

  async function joinProject(projectId: string) {
    if (!session) {
      toast({
        title: "Error",
        description: "Please log in to join a project",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/join`, {
        method: 'POST',
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      toast({
        title: "Success",
        description: "Successfully joined the project!",
      })
      fetchProjects()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join project",
        variant: "destructive",
      })
    }
  }

  async function createProject() {
    if (!session) {
      toast({
        title: "Error",
        description: "Please log in to create a project",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProject,
          creatorId: session.user.id,
          participants: 0
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message)

      toast({
        title: "Success",
        description: "Project created successfully!",
      })
      fetchProjects()
      setNewProject({})
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-600">Environmental Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Project Title"
                value={newProject.title || ''}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              />
              <Textarea
                placeholder="Project Description"
                value={newProject.description || ''}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              />
              <Input
                type="date"
                value={newProject.date || ''}
                onChange={(e) => setNewProject({...newProject, date: e.target.value})}
              />
              <Select
                onValueChange={(value) => setNewProject({...newProject, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleanup">Cleanup</SelectItem>
                  <SelectItem value="conservation">Conservation</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={createProject}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="flex flex-col">
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
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => joinProject(project._id)}
              >
                Join Project
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
