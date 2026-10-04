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
    const { phone, message, appointment_id } = await req.json()
    if (!phone || !message) {
      return new Response(JSON.stringify({ error: 'phone and message required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    let smsStatus = 'sent'
    if (accountSid && authToken && fromNumber) {
      const url = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json'
      const body = new URLSearchParams({ From: fromNumber, To: phone, Body: message })
      const resp = await fetch(url, {
        method: 'POST',
        headers: { Authorization: 'Basic ' + btoa(accountSid + ':' + authToken), 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!resp.ok) {
        smsStatus = 'failed'
      }
    }

    if (supabaseUrl && serviceKey) {
      const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
      const supabase = createClient(supabaseUrl, serviceKey)
      await supabase.from('sms_logs').insert({ phone, message, status: smsStatus, appointment_id: appointment_id || null })
    }

    return new Response(JSON.stringify({ success: true, status: smsStatus }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
