import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const url = isLogin ? `${API}/auth/login` : `${API}/auth/register`
      const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password}) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('ss_user', JSON.stringify(data))
      if(!isLogin) {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }
    } catch(err){
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4 py-10">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white/10 border border-white/10 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-1">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
        <p className="text-slate-300 mb-6">{isLogin ? 'Sign in to continue' : 'Start your SkillSwap journey'}</p>
        <form onSubmit={submit} className="space-y-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none" />
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none" />
          {error && <p className="text-red-300 text-sm">{error}</p>}
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold disabled:opacity-60">{loading? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}</button>
        </form>
        <button onClick={()=>setIsLogin(!isLogin)} className="mt-4 text-sm text-slate-300 hover:text-white">
          {isLogin ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}
