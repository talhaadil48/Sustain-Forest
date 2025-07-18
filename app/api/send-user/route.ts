import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const body = await req.json()
  const { userid , content, star } = body
 

  if (!userid || typeof star !== 'number') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }


  // Step 2: Insert a new review with this user ID
  const { error: reviewError } = await supabase.from('reviews').insert([
    {
      user_id: userid,
      content,
      star,
    },
  ])

  if (reviewError) {
    return NextResponse.json({ error: 'Review insert failed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Username updated and review saved' })
}
