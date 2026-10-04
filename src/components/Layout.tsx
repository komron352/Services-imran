import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, Wrench, MessageSquare, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', labelTj: 'Панели асосӣ' },
  { to: '/clients', icon: Users, label: 'Clients', labelTj: 'Мизоҷон' },
  { to: '/calendar', icon: Calendar, label: 'Calendar', labelTj: 'Тақвим' },
  { to: '/services', icon: Wrench, label: 'Services', labelTj: 'Хизматрасониҳо' },
  { to: '/sms-logs', icon: MessageSquare, label: 'SMS Logs', labelTj: 'SMS' },
  { to: '/settings', icon: Settings, label: 'Settings', labelTj: 'Танзимот' },
]

export default function Layout() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }
  return (
    <div className='min-h-screen bg-[#08080a] flex'>
      <aside className='w-[260px] border-r border-[#1f1f23] bg-[#0c0c0e] hidden md:flex flex-col fixed h-screen'>
        <div className='p-6 border-b border-[#1f1f23]'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-lg bg-[#d4a017] flex items-center justify-center text-black font-bold text-sm'>IS</div>
            <div>
              <div className='font-semibold text-[15px] tracking-tight'>IMRAN SERVICE</div>
              <div className='text-[11px] text-[#9a9aa0] -mt-0.5'>CRM v1.0</div>
            </div>
          </div>
        </div>
        <nav className='flex-1 p-3 space-y-1 overflow-y-auto'>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition-all ' + (isActive ? 'bg-[#1a1a1e] text-[#e8e8e8] border border-[#2a2a2e]' : 'text-[#9a9aa0] hover:text-[#e8e8e8] hover:bg-[#111113]')}>
              <item.icon className='w-4 h-4' />
              <span>{item.labelTj}</span>
            </NavLink>
          ))}
        </nav>
        <div className='p-4 border-t border-[#1f1f23]'>
          <div className='text-[12px] text-[#9a9aa0] truncate mb-3'>{user?.email}</div>
          <button onClick={handleLogout} className='w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111113] border border-[#1f1f23] text-[13px] text-[#9a9aa0] hover:text-white hover:border-[#2a2a2e]'>
            <LogOut className='w-4 h-4' /> Баромад
          </button>
        </div>
      </aside>
      <main className='flex-1 md:ml-[260px]'>
        <div className='md:hidden sticky top-0 z-20 bg-[#0c0c0e] border-b border-[#1f1f23] p-3 flex items-center justify-between'>
          <div className='flex items-center gap-2'><div className='w-7 h-7 rounded bg-[#d4a017] flex items-center justify-center text-black font-bold text-xs'>IS</div><span className='font-semibold text-sm'>IMRAN SERVICE</span></div>
          <button onClick={handleLogout} className='text-[#9a9aa0]'><LogOut className='w-4 h-4' /></button>
        </div>
        <div className='md:hidden bg-[#0c0c0e] border-b border-[#1f1f23] flex overflow-x-auto p-2 gap-1'>
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => 'whitespace-nowrap px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 ' + (isActive ? 'bg-[#1a1a1e] text-white' : 'text-[#9a9aa0]')}>
              <item.icon className='w-3.5 h-3.5' />{item.labelTj}
            </NavLink>
          ))}
        </div>
        <div className='p-4 md:p-8 max-w-[1400px] mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
