import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST() {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name: 'guest' }])
    .select('id')
    .single()

  if (error || !data) {
    console.log(error)
    return NextResponse.json({ error: 'Guest insert failed' }, { status: 500 })
  }
  console.log(data)

  return NextResponse.json({ message: 'Guest inserted', id: data.id })
}
