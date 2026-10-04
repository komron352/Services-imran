import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import CalendarPage from './pages/CalendarPage'
import ServicesPage from './pages/ServicesPage'
import SmsLogs from './pages/SmsLogs'
import SettingsPage from './pages/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className='min-h-screen bg-[#08080a] flex items-center justify-center text-[#9a9aa0]'>Боркунӣ...</div>
  }
  if (!user) {
    return <Navigate to='/login' replace />
  }
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path='clients' element={<Clients />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='services' element={<ServicesPage />} />
        <Route path='sms-logs' element={<SmsLogs />} />
        <Route path='settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
