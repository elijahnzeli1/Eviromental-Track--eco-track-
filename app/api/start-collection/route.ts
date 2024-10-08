import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/src/lib/prisma'

export async function POST() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const newCollection = await prisma.wasteCollection.create({
      data: {
        userId: session.user.id,
        createdAt: new Date(),
        wasteType: '', // Add a default value or get it from the request
        quantity: 0, // Add a default value or get it from the request
        location: '', // Add a default value or get it from the request
      },
    })

    return NextResponse.json({ success: true, collectionId: newCollection.id })
  } catch (error) {
    console.error('Failed to start new collection:', error)
    return NextResponse.json({ error: 'Failed to start new collection' }, { status: 500 })
  }
}
