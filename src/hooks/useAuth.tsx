import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

type AuthContextType = { user: User | null, loading: boolean, signIn: (email:string,password:string)=>Promise<{error:any}>, signOut: ()=>Promise<void> }

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signIn: async ()=>({error:null}), signOut: async ()=>{} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setLoading(false) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { setUser(session?.user ?? null) })
    return () => { sub.subscription.unsubscribe() }
  }, [])
  const signIn = async (email:string,password:string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }
  const signOut = async () => { await supabase.auth.signOut() }
  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
