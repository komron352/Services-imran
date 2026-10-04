import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function SmsLogs() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
      try { const data = await api.getSmsLogs(); setLogs(data) } finally { setLoading(false) }
    })()
  }, [])

  return (
    <div className='space-y-5'>
      <div><h1 className='text-[22px] font-semibold tracking-tight'>SMS Logs</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>Таърихи SMS огоҳиномаҳо</p></div>
      <div className='bg-[#111113] border border-[#1f1f23] rounded-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='bg-[#0c0c0e] border-b border-[#1f1f23] text-[11px] text-[#6a6a70] uppercase tracking-widest'><tr><th className='px-4 py-3'>Телефон</th><th className='px-4 py-3'>Матн</th><th className='px-4 py-3'>Вазъ</th><th className='px-4 py-3'>Сана</th></tr></thead>
            <tbody className='divide-y divide-[#1f1f23]'>{loading ? <tr><td colSpan={4} className='px-4 py-12 text-center text-[#6a6a70] text-[13px]'>Боркунӣ...</td></tr> : logs.map((l:any)=><tr key={l.id}><td className='px-4 py-3 text-[13px]'>{l.phone}</td><td className='px-4 py-3 text-[12px] text-[#9a9aa0] max-w-[300px] truncate'>{l.message}</td><td className='px-4 py-3'><span className={'text-[11px] px-2 py-1 rounded-full border ' + (l.status==='sent' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400')}>{l.status}</span></td><td className='px-4 py-3 text-[12px] text-[#9a9aa0]'>{new Date(l.created_at).toLocaleString('tg-TJ')}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
