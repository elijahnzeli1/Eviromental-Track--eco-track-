import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from '@/src/lib/prisma'; // Assuming you're using Prisma for database access

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.tokensEarned < amount) {
      return res.status(400).json({ message: 'Insufficient tokens' });
    }

    // Update user's token balance
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: { tokensEarned: { decrement: amount } },
    });

    // Here you would typically also create a transaction record or update other relevant data

    return res.status(200).json({ 
      message: 'Tokens sold successfully', 
      soldAmount: amount, 
      remainingTokens: updatedUser.tokensEarned 
    });
  } catch (error) {
    console.error('Error selling tokens:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
