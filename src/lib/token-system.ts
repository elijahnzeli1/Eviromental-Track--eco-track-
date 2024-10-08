import { supabase } from '@/src/lib/supabase'

export async function awardTokens(userId: string, amount: number) {
  const { data, error } = await supabase
    .from('users')
    .update({ tokens_earned: supabase.raw(`tokens_earned + ${amount}`) })
    .eq('id', userId)
    .select('tokens_earned')
    .single()

  if (error) throw error
  return data.tokens_earned
}

export async function spendTokens(userId: string, amount: number) {
  const { data, error } = await supabase
    .from('users')
    .update({ tokens_earned: supabase.raw(`tokens_earned - ${amount}`) })
    .eq('id', userId)
    .gte('tokens_earned', amount)
    .select('tokens_earned')
    .single()

  if (error) throw error
  return data.tokens_earned
}

export async function getTokenBalance(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('tokens_earned')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data.tokens_earned
}

// Update other functions similarly