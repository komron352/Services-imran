import { supabase } from '../lib/supabase'

export const api: any = {
  getServices: async () => {
    if (!supabase) return []
    const { data, error }: any = await supabase.from('services').select('*')
    if (error) console.log(error)
    return data || []
  },
  getOrders: async () => {
    if (!supabase) return []
    const { data }: any = await supabase.from('orders').select('*')
    return data || []
  },
  createOrder: async (payload: any) => {
    if (!supabase) return { success: true }
    const { data, error }: any = await supabase.from('orders').insert(payload).select()
    return { data, error }
  }
}