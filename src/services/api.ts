import { supabase } from '../lib/supabase'

export const api = {
  async getClients() {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  },
  async createClient(payload: any) {
    const { data, error } = await supabase.from('clients').insert(payload).select().single()
    if (error) throw error
    return data
  },
  async updateClient(id: string, payload: any) {
    const { data, error } = await supabase.from('clients').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  async deleteClient(id: string) {
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) throw error
  },
  async getServices() {
    const { data, error } = await supabase.from('services').select('*').order('name')
    if (error) throw error
    return data
  },
  async createService(payload: any) {
    const { data, error } = await supabase.from('services').insert(payload).select().single()
    if (error) throw error
    return data
  },
  async updateService(id: string, payload: any) {
    const { data, error } = await supabase.from('services').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  async deleteService(id: string) {
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (error) throw error
  },
  async getAppointments() {
    const { data, error } = await supabase.from('appointments').select('*, clients(name, phone), services(name)').order('start_at', { ascending: true })
    if (error) throw error
    return data
  },
  async createAppointment(payload: any) {
    const { data, error } = await supabase.from('appointments').insert(payload).select().single()
    if (error) throw error
    return data
  },
  async updateAppointment(id: string, payload: any) {
    const { data, error } = await supabase.from('appointments').update(payload).eq('id', id).select().single()
    if (error) throw error
    return data
  },
  async deleteAppointment(id: string) {
    const { error } = await supabase.from('appointments').delete().eq('id', id)
    if (error) throw error
  },
  async getSmsLogs() {
    const { data, error } = await supabase.from('sms_logs').select('*').order('created_at', { ascending: false }).limit(100)
    if (error) throw error
    return data
  },
  async getDashboardStats() {
    const [clientsRes, appointmentsRes, servicesRes] = await Promise.all([
      supabase.from('clients').select('id', { count: 'exact', head: true }),
      supabase.from('appointments').select('id, status', { count: 'exact' }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
    ])
    return {
      clients: clientsRes.count || 0,
      appointments: appointmentsRes.count || 0,
      services: servicesRes.count || 0,
      pending: appointmentsRes.data?.filter((a:any)=>a.status==='pending').length || 0,
    }
  }
}
