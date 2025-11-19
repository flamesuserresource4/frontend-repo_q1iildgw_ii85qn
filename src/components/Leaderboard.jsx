import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Leaderboard(){
  const [items, setItems] = useState([])

  useEffect(()=>{ fetch(`${API}/leaderboard`).then(r=>r.json()).then(d=> setItems(d.top||[])) },[])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="space-y-3">
        {items.map((u,i)=> (
          <div key={u._id} className="p-4 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 grid place-items-center">{i+1}</div>
            <div className="flex-1">
              <div className="font-semibold">{u.name||u.email}</div>
              <div className="text-slate-400 text-sm">Sessions: {u.teaching_sessions||0} • Rating: {(u.rating_avg||0).toFixed(1)}</div>
            </div>
            <div className="flex gap-2">
              {(u.badges||[]).map(b=> <span key={b} className="px-2 py-1 rounded bg-white/10 text-xs">{b}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
