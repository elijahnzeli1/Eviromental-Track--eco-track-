// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '../../auth/[...nextauth]/route'
// import connectDB from '@/src/lib/mongodb'
// import User from '@/src/models/user'

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { tokensEarned, wasteCollected } = await req.json()

//     await connectDB()
//     const user = await User.findById(session.user.id)

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     // Update user stats
//     user.tokensEarned += tokensEarned
//     user.wasteCollected += wasteCollected
//     await user.save()

//     return NextResponse.json({
//       message: 'Stats updated successfully',
//       tokensEarned: user.tokensEarned,
//       wasteCollected: user.wasteCollected
//     })
//   } catch (error) {
//     console.error('Failed to update user stats:', error)
//     return NextResponse.json({ error: 'Failed to update user stats' }, { status: 500 })
//   }
// }