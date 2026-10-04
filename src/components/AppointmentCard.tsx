export default function AppointmentCard({ appointment }: { appointment: any }) {
  return (
    <div className='bg-[#111113] border border-[#1f1f23] rounded-xl p-4 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 rounded-full bg-[#1a1a1e] border border-[#232326] flex items-center justify-center text-sm font-medium'>{appointment.client_name?.[0] || 'M'}</div>
        <div>
          <div className='text-[13.5px] font-medium'>{appointment.client_name || 'Мизоҷ'}</div>
          <div className='text-[12px] text-[#9a9aa0]'>{appointment.service_name} • {appointment.time || appointment.start_at}</div>
        </div>
      </div>
      <div className={'text-[11px] px-2.5 py-1 rounded-full border ' + (appointment.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : appointment.status === 'cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-[#d4a017]/10 border-[#d4a017]/20 text-[#d4a017]')}>{appointment.status}</div>
    </div>
  )
}
