import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://klcurttqpnwdaorzwohc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsY3VydHRxcG53ZGFvcnp3b2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODAyOTUsImV4cCI6MjA3NjY1NjI5NX0.abIy5UXlNFLZ1SHfePqL-NNfq6uHkGXn4r18xAelttc'
export const supabase = createClient(supabaseUrl, supabaseKey)
