import prisma from './prisma'

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