import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    else navigate('/')
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-[#08080a] flex items-center justify-center p-4'>
      <div className='w-full max-w-[380px]'>
        <div className='text-center mb-8'>
          <div className='w-12 h-12 rounded-xl bg-[#d4a017] mx-auto flex items-center justify-center text-black font-bold mb-4'>IS</div>
          <h1 className='text-[22px] font-semibold tracking-tight'>IMRAN SERVICE</h1>
          <p className='text-[13px] text-[#9a9aa0] mt-1'>Воридшавӣ ба CRM</p>
        </div>
        <div className='bg-[#111113] border border-[#1f1f23] rounded-2xl p-6'>
          <form onSubmit={handle} className='space-y-4'>
            <div>
              <label className='text-[12px] text-[#9a9aa0]'>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type='email' required className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50' placeholder='admin@imran.tj' />
            </div>
            <div>
              <label className='text-[12px] text-[#9a9aa0]'>Рамз</label>
              <input value={password} onChange={e=>setPassword(e.target.value)} type='password' required className='mt-1 w-full bg-[#0c0c0e] border border-[#1f1f23] rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#d4a017]/50' placeholder='••••••••' />
            </div>
            {error && <div className='text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2'>{error}</div>}
            <button disabled={loading} className='w-full py-2.5 rounded-lg bg-[#d4a017] text-black font-medium text-[13.5px] disabled:opacity-50'>{loading ? 'Воридшавӣ...' : 'Ворид шудан'}</button>
          </form>
          <div className='mt-6 text-[11px] text-[#6a6a70] text-center'>Барои дастрасӣ бо администратор тамос гиред</div>
        </div>
      </div>
    </div>
  )
}
