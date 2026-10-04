import { LucideIcon } from 'lucide-react'

export default function StatCard({ title, value, icon: Icon, trend, sub }: { title: string, value: string, icon: LucideIcon, trend?: string, sub?: string }) {
  return (
    <div className='bg-[#111113] border border-[#1f1f23] rounded-xl p-5'>
      <div className='flex items-start justify-between mb-3'>
        <div className='text-[12px] text-[#9a9aa0] uppercase tracking-widest'>{title}</div>
        <div className='w-8 h-8 rounded-lg bg-[#1a1a1e] border border-[#232326] flex items-center justify-center'><Icon className='w-4 h-4 text-[#d4a017]' /></div>
      </div>
      <div className='text-[28px] font-semibold tracking-tight leading-none'>{value}</div>
      {trend && <div className='mt-2 text-[12px] text-emerald-400'>{trend}</div>}
      {sub && <div className='mt-1 text-[12px] text-[#6a6a70]'>{sub}</div>}
    </div>
  )
}
