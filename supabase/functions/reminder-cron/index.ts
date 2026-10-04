import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
    const supabase = createClient(supabaseUrl, serviceKey)

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const start = new Date(tomorrow.setHours(0,0,0,0)).toISOString()
    const end = new Date(tomorrow.setHours(23,59,59,999)).toISOString()

    const { data: appointments, error } = await supabase.from('appointments').select('id, start_at, clients(phone, name), services(name)').gte('start_at', start).lte('start_at', end).eq('status', 'confirmed')

    if (error) throw error

    let sent = 0
    for (const appt of appointments || []) {
      const client = appt.clients as any
      const service = appt.services as any
      if (!client?.phone) continue
      const message = 'Салом ' + (client.name || '') + '! Фардо соати ' + new Date(appt.start_at).toLocaleTimeString('tg-TJ', { hour: '2-digit', minute: '2-digit' }) + ' барои хизматрасонии ' + (service?.name || '') + ' дар IMRAN SERVICE интизори шумо ҳастем. Ташаккур!'
      await fetch(supabaseUrl + '/functions/v1/send-sms', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + serviceKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: client.phone, message, appointment_id: appt.id }),
      })
      sent++
    }

    return new Response(JSON.stringify({ success: true, sent }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
