'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send } from 'lucide-react'

type Message = {
  content: string
  sender: 'user' | 'assistant'
}

export default function VirtualAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { content: input, sender: 'user' }])
      // Here you would typically send the message to your AI service
      // and get a response. This is a placeholder response.
      setTimeout(() => {
        setMessages(prev => [...prev, {
          content: "Thank you for your message. How can I assist you with Eco-Track today?",
          sender: 'assistant'
        }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Virtual Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`rounded-lg p-2 max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}