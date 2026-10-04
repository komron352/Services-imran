import { useEffect, useState } from 'react'
import { Plus, Search, Phone, Mail } from 'lucide-react'
import { api } from '../services/api'
import ClientForm from '../components/ClientForm'

export default function Clients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [q, setQ] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getClients()
      setClients(data)
    } catch(e) { console.error(e) } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [])

  const filtered = clients.filter((c:any)=> c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q))

  const handleCreate = async (payload:any) => {
    if (editing) await api.updateClient(editing.id, payload)
    else await api.createClient(payload)
    setShowForm(false)
    setEditing(null)
    load()
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <div><h1 className='text-[22px] font-semibold tracking-tight'>Мизоҷон</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>{clients.length} мизоҷ</p></div>
        <button onClick={()=>{ setEditing(null); setShowForm(true)}} className='flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d4a017] text-black text-[13px] font-medium'><Plus className='w-4 h-4' /> Мизоҷи нав</button>
      </div>
      <div className='relative max-w-[360px]'>
        <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a70]' />
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Ҷустуҷӯи мизоҷ...' className='w-full bg-[#111113] border border-[#1f1f23] rounded-lg pl-9 pr-3 py-2.5 text-[13px] outline-none focus:border-[#d4a017]/30' />
      </div>
      <div className='bg-[#111113] border border-[#1f1f23] rounded-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='bg-[#0c0c0e] border-b border-[#1f1f23] text-[11px] text-[#6a6a70] uppercase tracking-widest'><tr><th className='px-4 py-3 font-medium'>Мизоҷ</th><th className='px-4 py-3 font-medium'>Телефон</th><th className='px-4 py-3 font-medium'>Сана</th><th className='px-4 py-3 font-medium'></th></tr></thead>
            <tbody className='divide-y divide-[#1f1f23]'>
              {loading ? <tr><td colSpan={4} className='px-4 py-12 text-center text-[#6a6a70] text-[13px]'>Боркунӣ...</td></tr> : filtered.length ? filtered.map((c:any)=><tr key={c.id} className='hover:bg-[#0c0c0e]/50'><td className='px-4 py-3'><div className='font-medium text-[13px]'>{c.name}</div><div className='text-[12px] text-[#9a9aa0] flex items-center gap-1'><Mail className='w-3 h-3' />{c.email || '—'}</div></td><td className='px-4 py-3 text-[13px] flex items-center gap-1'><Phone className='w-3 h-3 text-[#9a9aa0]' />{c.phone}</td><td className='px-4 py-3 text-[12px] text-[#9a9aa0]'>{new Date(c.created_at).toLocaleDateString('tg-TJ')}</td><td className='px-4 py-3 text-right'><button onClick={()=>{ setEditing(c); setShowForm(true)}} className='text-[12px] text-[#d4a017] hover:underline'>Таҳрир</button></td></tr>) : <tr><td colSpan={4} className='px-4 py-12 text-center text-[#6a6a70] text-[13px]'>Мизоҷ ёфт нашуд</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && <ClientForm initial={editing} onSubmit={handleCreate} onClose={()=>{ setShowForm(false); setEditing(null)}} />}
    </div>
  )
}
