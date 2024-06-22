import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rspunypvrshpypsixaro.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

const client = createClient(supabaseUrl, supabaseKey)

export { client }
