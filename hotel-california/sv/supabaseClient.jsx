import { createClient } from '@supabase/supabase-js'

// 👉 Tus claves desde Supabase
const supabaseUrl = 'https://vzidygplxuqbearlkoju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aWR5Z3BseHVxYmVhcmxrb2p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTgzMTcsImV4cCI6MjA3NjAzNDMxN30.zKuFeAE3X-hts6KkBDogRSdPphicBYDofHesaekF4vM'

// Cliente listo para usar en toda la app
export const supabase = createClient(supabaseUrl, supabaseKey)
