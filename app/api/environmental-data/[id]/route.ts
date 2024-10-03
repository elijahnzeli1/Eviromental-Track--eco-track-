import { NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const data = await prisma.environmentalData.findUnique({
    where: { id },
  })

  if (!data) {
    return new NextResponse('Environmental data not found', { status: 404 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const json = await request.json()

  const newData = await prisma.environmentalData.create({
    data: json,
  })

  return NextResponse.json(newData)
}