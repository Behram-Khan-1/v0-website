import { getSupabaseClient } from "./client"
import { getSupabaseServer } from "./server"

export async function signInWithEmail(email: string, password: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const supabase = await getSupabaseServer()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return { user, error }
}

export async function getSession() {
  const supabase = await getSupabaseServer()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()
  return { session, error }
}
