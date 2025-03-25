import { create } from 'zustand';
import { initSupabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type User = Database['public']['Tables']['users']['Row'];

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false }),
  initialize: async () => {
    if (get().initialized) return;
    
    try {
      const client = await initSupabase();
      const { data: { user } } = await client.auth.getUser();
      
      if (user) {
        const { data: userData } = await client
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        set({ user: userData, loading: false, initialized: true });
      } else {
        set({ user: null, loading: false, initialized: true });
      }
    } catch (error) {
      console.error('Failed to initialize auth store:', error);
      set({ loading: false, initialized: true });
    }
  },
  signIn: async (email, password) => {
    try {
      const client = await initSupabase();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const { data: userData, error: userError } = await client
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;
      set({ user: userData });
    } catch (error) {
      console.error('Failed to sign in:', error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      const client = await initSupabase();
      await client.auth.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Failed to sign out:', error);
      throw error;
    }
  },
}));