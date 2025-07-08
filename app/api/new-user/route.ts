import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, gender, qualification } = body
  

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, gender, qualification }])
    .select('id')
   

  if (error || !data) {
    console.error(error)
    return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
  }

  return NextResponse.json({ message: 'User inserted', id: data[0]?.id })
}
