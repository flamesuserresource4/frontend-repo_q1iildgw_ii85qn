import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard(){
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('ss_user'))

  useEffect(()=>{
    if(!user) { navigate('/auth'); return }
    fetch(`${API}/profile/${user.user_id}`).then(r=>r.json()).then(setProfile)
  },[])

  if(!profile) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <ProfileCard p={profile} />
        <div className="grid sm:grid-cols-2 gap-4">
          <NavCard title="Find Matches" to="/matches" color="from-indigo-500/20 to-fuchsia-500/20" />
          <NavCard title="Chat" to={`/chat/${profile._id||'me'}`} color="from-emerald-500/20 to-teal-500/20" />
          <NavCard title="Scheduled Sessions" to="/sessions" color="from-cyan-500/20 to-blue-500/20" />
          <NavCard title="Leaderboard" to="/leaderboard" color="from-amber-500/20 to-pink-500/20" />
        </div>
      </div>
      <div className="space-y-6">
        <StatsCard title="Skill Coins" value={profile.coins ?? 20} />
        <StatsCard title="Rating" value={`${(profile.rating_avg||0).toFixed(1)} ⭐ (${profile.rating_count||0})`} />
        <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
          <h3 className="font-semibold mb-2">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {(profile.badges||[]).length? profile.badges.map(b=> <span key={b} className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{b}</span>) : <p className="text-slate-400">No badges yet</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileCard({ p }){
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-indigo-500/30 border border-white/10 grid place-items-center text-2xl">👤</div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold">{p.name||'New User'}</h3>
            <span className="text-slate-400">{[p.city, p.age && `${p.age}`].filter(Boolean).join(' • ')}</span>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <TagGroup title="Skills to teach" items={p.teach_skills||[]} color="emerald" />
            <TagGroup title="Skills to learn" items={p.learn_skills||[]} color="indigo" />
          </div>
          <div className="mt-4">
            <h4 className="text-sm text-slate-400 mb-1">Availability</h4>
            <div className="text-slate-200 text-sm">
              {(p.availability||[]).length? p.availability.map(a=> <div key={a.day}>{a.day}: {a.slots.join(', ')}</div>) : 'No availability set'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TagGroup({ title, items, color }){
  const base = color==='emerald' ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200'
  return (
    <div>
      <h4 className="text-sm text-slate-400 mb-1">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.length? items.map(s=> <span key={s} className={`px-3 py-1 rounded-full text-sm border ${base}`}>{s}</span>) : <span className="text-slate-400">None</span>}
      </div>
    </div>
  )
}

function NavCard({ title, to, color }){
  return (
    <Link to={to} className={`p-5 rounded-2xl bg-gradient-to-b ${color} border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition`}>{title}</Link>
  )
}

function StatsCard({ title, value }){
  return (
    <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
