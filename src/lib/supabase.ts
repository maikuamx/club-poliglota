import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const BACKEND_URL = 'https://club-poliglota.onrender.com';

export const supabase = createClient<Database>(
  'https://dntwlevsgpjhvimdmjsi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudHdsZXZzZ3BqaHZpbWRtanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTc1MDAsImV4cCI6MjA1ODMzMzUwMH0.zURvGkX6_uPSbhrK1YWw8W3N45HySaujlmUjhDnSGeE'
);

export const initSupabase = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/config`);
    const config = await response.json();
    
    if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
      throw new Error('Missing Supabase configuration from server');
    }

    return createClient<Database>(
      config.SUPABASE_URL,
      config.SUPABASE_ANON_KEY
    );
  } catch (error) {
    console.error('Failed to fetch Supabase configuration:', error);
    return supabase; // Fallback to environment variables
  }
};