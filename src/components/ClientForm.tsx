import { useState } from 'react'

export default function ClientForm({ initial, onSubmit, onClose }: { initial?: any, onSubmit: (data:any)=>Promise<void>, onClose: ()=>void }) {
  const [form, setForm] = useState({ name: initial?.name || '', phone: initial?.phone || '', email: initial?.email || '', notes: initial?.notes || '' })
  const [loading, setLoading] = useState(false)
  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }
  return (
    <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className='w-full max-w-[440px] bg-[#111113] border border-[#1f1f23] rounded-2xl p-6'>
        <div className='flex items-center justify-between mb-5'><h3 className='font-semibold'>{initial ? 'Таҳрири мизоҷ' : 'Мизоҷи нав'}</h3><button onClick={onClose} className='text-[#9a9aa0] hover:text-white'>✕</button></div>
        <form onSubmit={handle} className='space-y-4'>
          <div><label className='text-[12px] text-[#9a9aa0]'>Ном</label><input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50' placeholder='Ном ва насаб' /></div>
          <div><label className='text-[12px] text-[#9a9aa0]'>Телефон</label><input required value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50' placeholder='+992 ...' /></div>
          <div><label className='text-[12px] text-[#9a9aa0]'>Email (ихтиёрӣ)</label><input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50' placeholder='email@example.com' /></div>
          <div><label className='text-[12px] text-[#9a9aa0]'>Эзоҳ</label><textarea value={form.notes} onChange={(e)=>setForm({...form, notes: e.target.value})} className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50 min-h-[80px]' placeholder='Эзоҳ...' /></div>
          <div className='flex gap-3 pt-2'><button type='button' onClick={onClose} className='flex-1 py-2.5 rounded-lg bg-[#1a1a1e] border border-[#1f1f23] text-[13px]'>Бекор</button><button disabled={loading} className='flex-1 py-2.5 rounded-lg bg-[#d4a017] text-black font-medium text-[13px] disabled:opacity-50'>{loading ? 'Нигоҳдорӣ...' : 'Сабт кардан'}</button></div>
        </form>
      </div>
    </div>
  )
}
