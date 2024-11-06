import connectDB from '@/src/lib/mongodb'
import User from '@/src/models/user'
import { ObjectId } from 'mongodb'

export async function awardTokens(userId: string, amount: number) {
  try {
    await connectDB()
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { tokensEarned: amount } },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found')
    }

    return user.tokensEarned
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function spendTokens(userId: string, amount: number) {
  try {
    await connectDB()
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    if (user.tokensEarned < amount) {
      throw new Error('Insufficient tokens')
    }

    user.tokensEarned -= amount
    await user.save()

    return user.tokensEarned
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function getTokenBalance(userId: string) {
  try {
    await connectDB()
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return user.tokensEarned
  } catch (error) {
    handleDatabaseError(error)
  }
}

// Helper function to handle database errors
function handleDatabaseError(error: unknown): never {
  console.error('Database error:', error)
  throw new Error(`Database operation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
}