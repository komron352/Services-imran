import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || ''
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || ''

export const isConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any