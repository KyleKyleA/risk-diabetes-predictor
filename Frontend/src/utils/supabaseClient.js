import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://oppakxtfpnkyxvhomfns.supabase.co'
const supabaseAnonKey = 'sb_publishable_CpVDaIc1j7fck1aiSdV1GQ_dM9v9pRc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)