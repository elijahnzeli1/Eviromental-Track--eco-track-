'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Message = {
  content: string
  sender: 'user' | 'assistant'
}

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Initial greeting message
    setMessages([
      {
        content: "Welcome to Eco-Track! I'm your virtual assistant. How can I help you today?",
        sender: 'assistant'
      }
    ])
  }, [])

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { content: input, sender: 'user' }])
      
      try {
        const response = await fetch('/api/ai-assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        })

        if (!response.ok) {
          throw new Error('Failed to get AI response')
        }

        const data = await response.json()
        setMessages(prev => [...prev, {
          content: data.response,
          sender: 'assistant'
        }])

        // Check if the AI suggests navigating to a specific page
        if (data.action === 'navigate') {
          router.push(data.path)
        }
      } catch (error) {
        console.error('Error getting AI response:', error)
        setMessages(prev => [...prev, {
          content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
          sender: 'assistant'
        }])
      }

      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        <ScrollArea className="h-full w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`rounded-lg p-2 max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button className="bg-green-600 text-white hover:bg-green-700" size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}