import { NextResponse } from 'next/server'
import { supabase } from '@/src/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, tokens_earned, waste_collected, rank')
    .eq('id', params.id)
    .single()

  if (error) {
    return new NextResponse('User not found', { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json()
  const { data, error } = await supabase
    .from('users')
    .update(json)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return new NextResponse('Update failed', { status: 500 })
  }

  return NextResponse.json(data)
}