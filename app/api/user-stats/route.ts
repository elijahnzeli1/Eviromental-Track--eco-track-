import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase'

export async function GET(req: Request) {
  const supabase = createClient()

  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('tokens_earned, waste_collected, rank')
      .eq('id', session.user.id)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      tokensEarned: user.tokens_earned,
      wasteCollected: user.waste_collected,
      rank: user.rank
    })
  } catch (error) {
    console.error('Failed to fetch user stats:', error)
    return NextResponse.json({ error: 'Failed to fetch user stats' }, { status: 500 })
  }
}
