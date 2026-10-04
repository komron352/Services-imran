export default function SettingsPage() {
  return (
    <div className='space-y-5 max-w-[640px]'>
      <div><h1 className='text-[22px] font-semibold tracking-tight'>Танзимот</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>Танзимоти система</p></div>
      <div className='bg-[#111113] border border-[#1f1f23] rounded-xl p-6 space-y-6'>
        <div><h3 className='font-medium text-[14px] mb-2'>IMRAN SERVICE CRM</h3><p className='text-[13px] text-[#9a9aa0] leading-relaxed'>Ин CRM барои идоракунии мизоҷон, вохӯриҳо, хизматрасониҳо ва ирсоли SMS огоҳиномаҳо сохта шудааст. Маълумот дар Supabase нигоҳ дошта мешавад. Барои SMS Twilio ё дигар провайдер тавассути Edge Functions истифода мешавад.</p></div>
        <div className='border-t border-[#1f1f23] pt-6'><h4 className='text-[13px] font-medium mb-2'>Муҳити зист</h4><div className='text-[12px] text-[#9a9aa0] space-y-1 font-mono bg-[#0c0c0e] border border-[#1f1f23] rounded-lg p-3'><div>VITE_SUPABASE_URL=***</div><div>VITE_SUPABASE_ANON_KEY=***</div></div></div>
        <div className='border-t border-[#1f1f23] pt-6'><h4 className='text-[13px] font-medium mb-2'>Версия</h4><div className='text-[12px] text-[#6a6a70]'>v1.0.0 • Production ready • Build: tsc -b && vite build</div></div>
      </div>
    </div>
  )
}
