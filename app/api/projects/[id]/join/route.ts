// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '../../../auth/[...nextauth]/route'
// import connectDB from '@/src/lib/mongodb'
// import Project from '@/src/models/project'
// import ProjectParticipant from '@/src/models/projectParticipant'

// export async function POST(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     await connectDB()

//     // Check if user is already participating
//     const existingParticipant = await ProjectParticipant.findOne({
//       projectId: params.id,
//       userId: session.user.id
//     })

//     if (existingParticipant) {
//       return NextResponse.json(
//         { error: 'Already participating in this project' },
//         { status: 400 }
//       )
//     }

//     // Create new participant
//     await ProjectParticipant.create({
//       projectId: params.id,
//       userId: session.user.id
//     })

//     // Update project participants count
//     await Project.findByIdAndUpdate(params.id, {
//       $inc: { participants: 1 }
//     })

//     return NextResponse.json({ message: 'Successfully joined project' })
//   } catch (error) {
//     console.error('Failed to join project:', error)
//     return NextResponse.json({ error: 'Failed to join project' }, { status: 500 })
//   }
// }
