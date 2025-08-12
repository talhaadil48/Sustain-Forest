// app/api/ping-supabase/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (reviewsError) {
      console.error('Supabase ping error:', reviewsError)
      return NextResponse.json({ ok: false, error: reviewsError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Supabase pinged successfully', data: reviewsData })
  } catch (err: any) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
