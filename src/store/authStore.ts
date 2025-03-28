import { create } from 'zustand';
import type { Database } from '../types/supabase';

type User = Database['public']['Tables']['users']['Row'];

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const BACKEND_URL = 'https://club-poliglota.onrender.com';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false }),
  initialize: async () => {
    if (useAuthStore.getState().initialized) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        set({ loading: false, initialized: true });
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        set({ user: userData, loading: false, initialized: true });
      } else {
        localStorage.removeItem('auth_token');
        set({ user: null, loading: false, initialized: true });
      }
    } catch (error) {
      console.error('Failed to initialize auth store:', error);
      localStorage.removeItem('auth_token');
      set({ loading: false, initialized: true });
    }
  },
  signIn: async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Invalid credentials');
      }

      const { token, user } = await response.json();
      localStorage.setItem('auth_token', token);
      set({ user });
      return user;
    } catch (error) {
      console.error('Failed to sign in:', error);
      throw error;
    }
  },
  signOut: async () => {
    localStorage.removeItem('auth_token');
    set({ user: null });
  },
}));