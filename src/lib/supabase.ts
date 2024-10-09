import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createClientComponentClient()
}

// export function createServerClient() {
//     return createServerComponentClient({ cookies })
//   }


// @Codebase   Help me create these all functions(tables, column and rows) in Supabase trough the supabase SQL editor.
// using the rpc method to call PostgreSQL functions