'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WasteCollectionForm from '@/src/components/WasteCollectionForm'
import { useToast } from '@/hooks/use-toast'

export default function WasteCollectionPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if there's an active collection
    const checkActiveCollection = async () => {
      const response = await fetch('/api/active-collection')
      if (!response.ok) {
        toast({
          title: 'No active collection',
          description: 'Please start a new collection from the dashboard.',
          variant: 'destructive',
        })
        router.push('/dashboard')
      }
    }

    checkActiveCollection()
  }, [router, toast])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Record Waste Collection</h1>
      <WasteCollectionForm />
    </div>
  )
}
