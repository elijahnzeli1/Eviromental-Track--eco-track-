'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CommunityPage() {
  const [postContent, setPostContent] = useState('')
  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: 'Alice', content: 'Just collected 5kg of plastic from the beach!', avatar: 'A' },
    { id: 2, author: 'Bob', content: 'Organizing a community cleanup this weekend. Who\'s in?', avatar: 'B' },
    { id: 3, author: 'Charlie', content: 'Reached my 100kg waste collection milestone today!', avatar: 'C' },
  ])

  const handlePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: communityPosts.length + 1,
        author: 'You', // Replace with actual user name when available
        content: postContent,
        avatar: 'Y', // Replace with actual user avatar when available
      }
      setCommunityPosts([newPost, ...communityPosts])
      setPostContent('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-600">Eco-Track Community</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Share Your Eco-Achievement</CardTitle>
          <CardDescription>Inspire others with your environmental efforts!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="What's your latest eco-achievement?"
              className="flex-grow"
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
            />
            <Button 
  onClick={handlePost} 
  disabled={!postContent.trim()} 
  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
>
  Post
</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.avatar}`} />
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <CardTitle>{post.author}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
