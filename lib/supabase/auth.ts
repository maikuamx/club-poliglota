import { createClient } from './client'
import { Database } from './types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type User = {
  id: string
  email: string
  profile?: Profile
}

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return { user: null, error }
  }

  // Obtener el perfil del usuario
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    user: {
      id: user.id,
      email: user.email!,
      profile: profile || undefined,
    },
    error: profileError,
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

export async function checkSubscription(userId: string): Promise<boolean> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_expires_at')
    .eq('id', userId)
    .single()

  if (error || !data) {
    return false
  }

  if (data.subscription_status !== 'premium') {
    return false
  }

  if (data.subscription_expires_at) {
    const expiresAt = new Date(data.subscription_expires_at)
    return expiresAt > new Date()
  }

  return true
}