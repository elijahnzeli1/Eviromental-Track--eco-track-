"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Calendar, Plus } from "lucide-react"
import { createClient } from '@/src/lib/supabase'
import { useAuth } from '@/app/Providers'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Project {
  id: number
  title: string
  description: string
  date: string
  participants: number
  category: string
  creator_id: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Partial<Project>>({})
  const { session } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
    
    if (error) {
      console.error('Error fetching projects:', error)
    } else {
      setProjects(data || [])
    }
  }

  async function joinProject(projectId: number) {
    if (!session) {
      alert('Please log in to join a project')
      return
    }

    const { data, error } = await supabase
      .from('project_participants')
      .insert({ project_id: projectId, user_id: session.user.id })

    if (error) {
      console.error('Error joining project:', error)
    } else {
      alert('Successfully joined the project!')
      fetchProjects()
    }
  }

  async function createProject() {
    if (!session) {
      alert('Please log in to create a project')
      return
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...newProject,
        creator_id: session.user.id,
        participants: 0
      })

    if (error) {
      console.error('Error creating project:', error)
    } else {
      alert('Project created successfully!')
      fetchProjects()
      setNewProject({})
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
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => joinProject(project.id)}
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
