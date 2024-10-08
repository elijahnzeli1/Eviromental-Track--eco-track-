'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export default function WasteCollectionForm() {
  const [wasteType, setWasteType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [location, setLocation] = useState('')
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchActiveCollection = async () => {
      const response = await fetch('/api/active-collection')
      if (response.ok) {
        const data = await response.json()
        setActiveCollectionId(data.collectionId)
      }
    }

    fetchActiveCollection()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/waste-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          wasteType, 
          quantity: Number(quantity), 
          location, 
          collectionId: activeCollectionId 
        }),
      })
      if (response.ok) {
        toast({
          title: 'Waste collection recorded',
          description: 'Thank you for your contribution!',
        })
        setWasteType('')
        setQuantity('')
        setLocation('')
      } else {
        throw new Error('Failed to record waste collection')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to record waste collection. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={wasteType} onValueChange={setWasteType}>
        <SelectTrigger>
          <SelectValue placeholder="Select waste type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="plastic">Plastic</SelectItem>
          <SelectItem value="paper">Paper</SelectItem>
          <SelectItem value="metal">Metal</SelectItem>
          <SelectItem value="glass">Glass</SelectItem>
          <SelectItem value="electronic">Electronic</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Quantity (kg)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button type="submit">Record Collection</Button>
    </form>
  )
}