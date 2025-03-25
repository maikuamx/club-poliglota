import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Create a single supabase client for database operations
export const supabase = createClient<Database>(
  'https://dntwlevsgpjhvimdmjsi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudHdsZXZzZ3BqaHZpbWRtanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTc1MDAsImV4cCI6MjA1ODMzMzUwMH0.zURvGkX6_uPSbhrK1YWw8W3N45HySaujlmUjhDnSGeE'
);