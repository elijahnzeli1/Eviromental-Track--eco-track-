'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import VirtualAssistant from '../src/components/VirtualAssistant'

export default function AISidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-96 h-[600px] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Virtual Assistant</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-grow overflow-hidden">
            <VirtualAssistant />
          </div>
        </div>
      ) : (
        <Button
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={32} />
        </Button>
      )}
    </div>
  )
}
