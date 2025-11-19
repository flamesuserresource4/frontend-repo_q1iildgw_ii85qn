import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Matches(){
  const [items, setItems] = useState([])
  const user = JSON.parse(localStorage.getItem('ss_user'))

  useEffect(()=>{
    fetch(`${API}/matches/${user.user_id}`).then(r=>r.json()).then(d=> setItems(d.matches||[]))
  },[])

  const ensureChat = async (otherId) => {
    const res = await fetch(`${API}/chat/ensure`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_a:user.user_id, user_b: otherId})})
    const data = await res.json()
    return data.chat_id
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Matches</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(m => (
          <div key={m.user_id} className="p-5 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 grid place-items-center text-xl">🧑‍🎓</div>
              <div className="flex-1">
                <div className="font-semibold">{m.name||'Skiller'}</div>
                <div className="text-slate-400 text-sm">{[m.city, m.age && `${m.age}`].filter(Boolean).join(' • ')}</div>
                <div className="mt-3 text-sm">
                  <div className="text-slate-400">They teach</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {m.match_for_me.map(s=> <span key={s} className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs">{s}</span>)}
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="text-slate-400">You teach</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {m.match_for_them.map(s=> <span key={s} className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-xs">{s}</span>)}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="#" onClick={async (e)=>{ e.preventDefault(); const id = await ensureChat(m.user_id); window.location.href = `/chat/${id}` }} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10">Chat & Schedule</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
