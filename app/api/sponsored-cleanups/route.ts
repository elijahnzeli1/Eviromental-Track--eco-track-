import { NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

export async function GET() {
  try {
    const sponsoredCleanups = await prisma.sponsoredCleanup.findMany({
      include: {
        sponsor: true,
      },
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    return NextResponse.json(sponsoredCleanups)
  } catch (error) {
    console.error('Failed to fetch sponsored cleanups:', error)
    return NextResponse.json({ error: 'Failed to fetch sponsored cleanups' }, { status: 500 })
  }
}