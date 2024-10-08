import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import prisma from '@/src/lib/prisma'

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const activeCollection = await prisma.wasteCollection.findFirst({
      where: {
        userId: session.user.id,
        status: 'IN_PROGRESS',
      },
    })

    if (activeCollection) {
      return NextResponse.json({ collectionId: activeCollection.id })
    } else {
      return NextResponse.json({ error: 'No active collection' }, { status: 404 })
    }
  } catch (error) {
    console.error('Failed to fetch active collection:', error)
    return NextResponse.json({ error: 'Failed to fetch active collection' }, { status: 500 })
  }
}
