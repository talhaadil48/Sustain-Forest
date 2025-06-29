'use client'

import React from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ResetButton() {
  const handleReset = async () => {
    try {
      // Step 1: Get all existing tables
      const { data: tables, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .neq('table_name', 'migrations')

      if (tableError) throw tableError

      // Step 2: Drop all tables
      for (const { table_name } of tables || []) {
        await supabase.rpc('exec_sql', {
          sql: `DROP TABLE IF EXISTS "${table_name}" CASCADE`
        })
      }

      // Step 3: Create user table
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE "user" (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name text NOT NULL,
            created_at timestamp with time zone DEFAULT now()
          );
        `
      })

      // Step 4: Create review table
      await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE "review" (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id uuid REFERENCES "user"(id) ON DELETE CASCADE,
            content text NOT NULL,
            stars int CHECK (stars >= 1 AND stars <= 5),
            created_at timestamp with time zone DEFAULT now()
          );
        `
      })

      alert('Tables reset and created successfully.')
    } catch (error) {
      console.error(error)
      alert('Error resetting tables.')
    }
  }

  return <button onClick={handleReset}>Reset Supabase Tables</button>
}
