import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createClientComponentClient()
}

export async function createMessage(userId: string, content: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('create_message', { p_user_id: userId, p_content: content })
  return { data, error }
}

export async function getChannelMessages(channelId: string, limit: number = 50) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('get_channel_messages', { p_channel_id: channelId, p_limit: limit })
  return { data, error }
}

export async function joinChannel(userId: string, channelId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('join_channel', { p_user_id: userId, p_channel_id: channelId })
  return { data, error }
}

// export function createServerClient() {
//     return createServerComponentClient({ cookies })
//   }


// @Codebase   Help me create these all functions(tables, column and rows) in Supabase trough the supabase SQL editor.
// using the rpc method to call PostgreSQL functions