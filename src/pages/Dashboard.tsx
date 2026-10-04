import { useEffect, useState } from 'react'
import { Users, Calendar, Wrench, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import AppointmentCard from '../components/AppointmentCard'
import { api } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, appointments: 0, services: 0, pending: 0 })
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const s = await api.getDashboardStats()
        setStats(s)
        const a = await api.getAppointments()
        setAppointments(a.slice(0,5))
      } catch(e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className='text-[#9a9aa0] text-sm'>Боркунӣ...</div>

  return (
    <div className='space-y-6'>
      <div><h1 className='text-[24px] font-semibold tracking-tight'>Панели асосӣ</h1><p className='text-[13px] text-[#9a9aa0] mt-1'>Хуш омадед ба IMRAN SERVICE CRM</p></div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard title='Мизоҷон' value={String(stats.clients)} icon={Users} trend='+12% ин моҳ' />
        <StatCard title='Вохӯриҳо' value={String(stats.appointments)} icon={Calendar} sub={stats.pending + ' дар интизорӣ'} />
        <StatCard title='Хизматрасониҳо' value={String(stats.services)} icon={Wrench} />
        <StatCard title='Интизорӣ' value={String(stats.pending)} icon={Clock} />
      </div>
      <div className='grid lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 bg-[#111113] border border-[#1f1f23] rounded-xl p-5'>
          <h3 className='font-medium text-[14px] mb-4'>Вохӯриҳои наздик</h3>
          <div className='space-y-3'>{appointments.length ? appointments.map((a:any)=><AppointmentCard key={a.id} appointment={{ client_name: a.clients?.name, service_name: a.services?.name, time: new Date(a.start_at).toLocaleString('tg-TJ'), status: a.status }} />) : <div className='text-[13px] text-[#6a6a70] py-8 text-center'>Вохӯрӣ нест</div>}</div>
        </div>
        <div className='bg-[#111113] border border-[#1f1f23] rounded-xl p-5'>
          <h3 className='font-medium text-[14px] mb-4'>Фаъолияти охирин</h3>
          <div className='space-y-3 text-[13px] text-[#9a9aa0]'>
            <div className='flex gap-2'><span className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2'></span><span>Мизоҷи нав илова шуд</span></div>
            <div className='flex gap-2'><span className='w-1.5 h-1.5 rounded-full bg-[#d4a017] mt-2'></span><span>SMS фиристода шуд</span></div>
            <div className='flex gap-2'><span className='w-1.5 h-1.5 rounded-full bg-blue-500 mt-2'></span><span>Вохӯрӣ таъйид шуд</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
