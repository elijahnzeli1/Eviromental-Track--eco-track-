// app/api/collections/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/src/lib/mongodb'
import { Collection } from '@/src/models'

export async function POST(request: Request) {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description } = await request.json()

    const collection = await Collection.create({
      title,
      description,
      status: 'IN_PROGRESS',
      userId: session.user.id,
    })

    return NextResponse.json(collection)
  } catch (error) {
    console.error('Error creating collection:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}