import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

let supabaseUrl: string;
let supabaseAnonKey: string;

async function initializeSupabase() {
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    
    supabaseUrl = config.SUPABASE_URL;
    supabaseAnonKey = config.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration from server');
    }
  } catch (error) {
    console.error('Failed to fetch Supabase configuration:', error);
    throw error;
  }
}

export const getSupabaseClient = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    await initializeSupabase();
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

export const supabase = await getSupabaseClient();