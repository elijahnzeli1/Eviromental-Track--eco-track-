import { NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabase'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json(data)
}

export async function DELETE() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Signed out successfully' })
}
