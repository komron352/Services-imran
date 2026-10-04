import { useEffect, useState } from 'react'
import { Plus, Clock, Coins } from 'lucide-react'
import { api } from '../services/api'

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', description: '', price: '', duration: '' })
  const [show, setShow] = useState(false)

  const load = async () => {
    setLoading(true)
    try { const data = await api.getServices(); setServices(data) } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.createService({ name: form.name, description: form.description, price: Number(form.price), duration_minutes: Number(form.duration) })
    setForm({ name:'', description:'', price:'', duration:'' })
    setShow(false)
    load()
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'><div><h1 className='text-[22px] font-semibold tracking-tight'>Хизматрасониҳо</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>Рӯйхати хизматрасониҳои IMRAN SERVICE</p></div><button onClick={()=>setShow(true)} className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4a017] text-black text-[13px] font-medium'><Plus className='w-4 h-4' /> Хизматрасонии нав</button></div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? <div className='text-[#6a6a70] text-sm'>Боркунӣ...</div> : services.map((s:any)=><div key={s.id} className='bg-[#111113] border border-[#1f1f23] rounded-xl p-5'><div className='font-medium text-[14px]'>{s.name}</div><div className='text-[12px] text-[#9a9aa0] mt-1 line-clamp-2'>{s.description || 'Тавсиф нест'}</div><div className='flex items-center gap-4 mt-4 text-[12px] text-[#9a9aa0]'><span className='flex items-center gap-1'><Coins className='w-3.5 h-3.5' />{s.price} TJS</span><span className='flex items-center gap-1'><Clock className='w-3.5 h-3.5' />{s.duration_minutes} дақ</span></div></div>)}
      </div>
      {show && <div className='fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4'><div className='w-full max-w-[420px] bg-[#111113] border border-[#1f1f23] rounded-2xl p-6'><div className='flex justify-between items-center mb-5'><h3 className='font-semibold'>Хизматрасонии нав</h3><button onClick={()=>setShow(false)} className='text-[#9a9aa0]'>✕</button></div><form onSubmit={handle} className='space-y-3'><input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder='Номи хизматрасонӣ' className='w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13px] outline-none' /><textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder='Тавсиф' className='w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13px] outline-none min-h-[70px]' /><div className='grid grid-cols-2 gap-3'><input required type='number' value={form.price} onChange={e=>setForm({...form, price: e.target.value})} placeholder='Нарх TJS' className='bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13px] outline-none' /><input required type='number' value={form.duration} onChange={e=>setForm({...form, duration: e.target.value})} placeholder='Давомнокӣ дақ' className='bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13px] outline-none' /></div><button className='w-full py-2.5 rounded-lg bg-[#d4a017] text-black font-medium text-[13px]'>Сабт кардан</button></form></div></div>}
    </div>
  )
}
