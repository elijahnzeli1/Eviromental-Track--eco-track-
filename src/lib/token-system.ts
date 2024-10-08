import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function awardTokens(userId: string, amount: number) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      tokensEarned: { increment: amount },
    },
  })
  return user.tokensEarned
}

export async function spendTokens(userId: string, amount: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.tokensEarned < amount) {
    throw new Error('Insufficient tokens')
  }
  
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      tokensEarned: { decrement: amount },
    },
  })
  return updatedUser.tokensEarned
}

export async function getTokenBalance(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return user?.tokensEarned || 0
}

export async function redeemTokens(userId: string, amount: number, rewardId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.tokensEarned < amount) {
    throw new Error('Insufficient tokens')
  }
  
  const reward = await prisma.Reward.findUnique({ where: { id: rewardId } })
  if (!reward || reward.tokenCost > amount) {
    throw new Error('Invalid reward or insufficient tokens')
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      tokensEarned: { decrement: amount },
    },
  })

  await prisma.redemption.create({
    data: {
      userId: userId,
      rewardId: rewardId,
      tokensCost: amount,
    },
  })

  return { updatedTokenBalance: updatedUser.tokensEarned, redeemedReward: reward }
}

export async function getAvailableRewards() {
  return prisma.reward.findMany({
    where: { isActive: true },
    include: { partner: true },
  })
}