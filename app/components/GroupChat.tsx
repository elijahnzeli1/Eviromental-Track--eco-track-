'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

// Mock data for demonstration purposes
const mockMessages = [
  { id: '1', user: 'Alice', message: 'Hello everyone!' },
  { id: '2', user: 'Bob', message: 'Hi Alice, how are you?' },
  { id: '3', user: 'Charlie', message: 'Hey all, excited for the next cleanup event!' },
]

export function GroupChat() {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now().toString(), user: 'CurrentUser', message: newMessage }])
      setNewMessage('')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <span className="font-bold">{msg.user}</span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
