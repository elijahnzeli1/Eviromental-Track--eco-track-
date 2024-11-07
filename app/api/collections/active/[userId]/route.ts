// app/api/collections/active/[userId]/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/src/lib/mongodb'
import { Collection } from '@/src/models'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if (!session || session.user.id !== params.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const activeCollection = await Collection.findOne({
      userId: params.userId,
      status: 'IN_PROGRESS'
    })

    if (!activeCollection) {
      return NextResponse.json(null)
    }

    return NextResponse.json(activeCollection)
  } catch (error) {
    console.error('Error fetching active collection:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}