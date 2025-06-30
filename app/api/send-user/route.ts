import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const body = await req.json()
  const { username, content, star } = body

  if (!username || !content || typeof star !== 'number') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { data: user, error: userError } = await supabase
    .from('users')
    .insert([{ name: username }])
    .select('id')
    .single()

  if (userError || !user) {
    return NextResponse.json({ error: 'User insert failed' }, { status: 500 })
  }

  const { error: reviewError } = await supabase.from('reviews').insert([
    {
      user_id: user.id,
      content,
      star,
    },
  ])

  if (reviewError) {
    return NextResponse.json({ error: 'Review insert failed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Saved' })
}
