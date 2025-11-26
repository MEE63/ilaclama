import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrboppgajzglgvbjwfzr.supabase.co' // Project Settings -> API kısmında yazar
const supabaseKey = 'sb_publishable_9AqZxDoxM4qoxeOVWWX5kg_Umaskb4M' // Project Settings -> API kısmında yazar

export const supabase = createClient(supabaseUrl, supabaseKey)