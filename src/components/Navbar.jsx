import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Search, Star, MessageCircle, Calendar, Users } from 'lucide-react'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = (()=>{ try { return JSON.parse(localStorage.getItem('ss_user')) } catch { return null } })()

  const logout = () => {
    localStorage.removeItem('ss_user')
    navigate('/auth')
  }

  const link = (to, label) => (
    <Link to={to} className={`px-3 py-2 rounded-lg text-sm transition ${pathname===to? 'bg-white/10 text-white':'text-slate-300 hover:text-white hover:bg-white/5'}`}>{label}</Link>
  )

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Menu className="w-5 h-5 text-slate-400" />
        <Link to="/" className="font-semibold tracking-tight text-white">SkillSwap</Link>
        <div className="hidden md:flex gap-1 ml-4">
          {link('/dashboard','Dashboard')}
          {link('/matches','Find Matches')}
          {link('/sessions','Sessions')}
          {link('/leaderboard','Leaderboard')}
          {link('/community','Community')}
          {link('/challenges','Challenges')}
          {link('/ai','AI Suggestion')}
          {link('/certs','Certificates')}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
            <Search className="w-4 h-4 mr-2" />
            <input placeholder="Search skills" className="bg-transparent outline-none placeholder:text-slate-500 w-40" />
          </div>
          {user ? (
            <button onClick={logout} className="px-3 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20">Logout</button>
          ) : (
            <Link to="/auth" className="px-3 py-2 text-sm rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
