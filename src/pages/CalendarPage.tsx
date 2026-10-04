import { useEffect, useState } from 'react'
import { api } from '../services/api'
import AppointmentCard from '../components/AppointmentCard'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async()=>{
      try {
        const data = await api.getAppointments()
        setAppointments(data)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className='space-y-5'>
      <div><h1 className='text-[22px] font-semibold tracking-tight'>Тақвим</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>Вохӯриҳо ва ҷадвали корӣ</p></div>
      <div className='bg-[#111113] border border-[#1f1f23] rounded-xl p-5'>
        <div className='flex items-center justify-between mb-4'><h3 className='font-medium text-[14px]'>Ҳамаи вохӯриҳо</h3><span className='text-[12px] text-[#6a6a70]'>{appointments.length} адад</span></div>
        {loading ? <div className='text-[13px] text-[#6a6a70] py-12 text-center'>Боркунӣ...</div> : <div className='space-y-3'>{appointments.map((a:any)=><AppointmentCard key={a.id} appointment={{ client_name: a.clients?.name, service_name: a.services?.name, time: new Date(a.start_at).toLocaleString('tg-TJ'), status: a.status }} />)}</div>}
      </div>
    </div>
  )
}
