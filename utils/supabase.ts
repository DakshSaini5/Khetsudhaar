import { hybridSupabase } from './hybridSupabase';

// MVP Mode: Using a Hybrid Supabase Client
// This handles Authentication and User Profiles locally (bypassing email confirmation)
// BUT it fetches all the real data (Market Prices, Quests, Lessons) from your actual Supabase DB!
export const supabase = hybridSupabase as any;