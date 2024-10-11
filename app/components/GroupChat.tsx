'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { io, Socket } from 'socket.io-client'

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

export function GroupChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Connect to WebSocket server
    socketRef.current = io('http://localhost:3001') // Replace with your WebSocket server URL

    // Load initial messages from the database
    fetchMessages()

    // Listen for new messages
    socketRef.current.on('newMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message])
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message: Omit<Message, 'id'> = {
        user: 'CurrentUser', // Replace with actual user info
        message: newMessage,
        timestamp: new Date()
      }

      try {
        // Send message to the server
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })

        if (response.ok) {
          // Emit the message through WebSocket
          socketRef.current?.emit('sendMessage', message)
          setNewMessage('')
        } else {
          console.error('Failed to send message')
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Group Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <span className="font-bold">{msg.user}</span>
              <span>{msg.message}</span>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
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
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
