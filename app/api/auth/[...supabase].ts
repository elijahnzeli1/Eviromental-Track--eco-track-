import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const supabase = createPagesServerClient({ req, res })
  await supabase.auth.getSession()
  res.end()
}

export default handler
