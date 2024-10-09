import { createClient } from '@/src/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

export async function awardTokens(userId: string, amount: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('award_tokens', { user_id: userId, amount: amount })

  if (error) handleSupabaseError(error)
  return data
}

export async function spendTokens(userId: string, amount: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('spend_tokens', { user_id: userId, amount: amount })

  if (error) handleSupabaseError(error)
  return data
}

export async function getTokenBalance(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('tokens_earned')
    .eq('id', userId)
    .single()

  if (error) handleSupabaseError(error)
  return data.tokens_earned
}

// Helper function to handle Supabase errors
function handleSupabaseError(error: PostgrestError): never {
  console.error('Supabase error:', error)
  throw new Error(`Database operation failed: ${error.message}`)
}