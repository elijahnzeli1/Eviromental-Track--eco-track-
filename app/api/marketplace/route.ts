import { NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import { getTokenBalance, spendTokens } from '@/src/lib/token-system'

export async function GET() {
  const items = await prisma.marketplaceItem.findMany()
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const { userId, itemId } = await request.json()

  const item = await prisma.marketplaceItem.findUnique({ where: { id: itemId } })
  if (!item) {
    return new NextResponse('Item not found', { status: 404 })
  }

  const userTokens = await getTokenBalance(userId)
  if (userTokens < item.tokenCost) {
    return new NextResponse('Insufficient tokens', { status: 400 })
  }

  try {
    await spendTokens(userId, item.tokenCost)
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        itemId,
        tokenCost: item.tokenCost,
      },
    })
    return NextResponse.json(purchase)
  } catch (error) {
    return new NextResponse('Purchase failed', { status: 500 })
  }
}