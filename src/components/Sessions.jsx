import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Sessions(){
  const [items, setItems] = useState([])
  const user = JSON.parse(localStorage.getItem('ss_user'))

  const load = async () => {
    const res = await fetch(`${API}/sessions/${user.user_id}`)
    const data = await res.json()
    setItems(data.sessions||[])
  }

  useEffect(()=>{ load() },[])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Scheduled Sessions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(s => <SessionCard key={s._id} s={s} reload={load} />)}
      </div>
    </div>
  )
}

function SessionCard({ s, reload }){
  const [score, setScore] = useState(5)
  const [feedback, setFeedback] = useState('')

  const rate = async () => {
    const user = JSON.parse(localStorage.getItem('ss_user'))
    const isTeacher = s.teacher_id === user.user_id
    const res = await fetch(`${API}/sessions/rate`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ session_id: s._id, rater_id: user.user_id, ratee_id: isTeacher? s.learner_id : s.teacher_id, score, feedback })})
    if(res.ok){ reload() }
  }

  return (
    <div className="p-5 rounded-2xl bg-white/10 border border-white/10">
      <div className="text-sm text-slate-400">{s.status}</div>
      <div className="font-semibold">{s.duration} mins • {s.scheduled_time}</div>
      <div className="mt-2 flex gap-2">
        {s.meet_link && <a href={s.meet_link} target="_blank" className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-100 border border-emerald-400/30">Start Google Meet</a>}
        {s.zoom_link && <a href={s.zoom_link} target="_blank" className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-100 border border-indigo-400/30">Start Zoom</a>}
      </div>
      {s.status !== 'completed' && (
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-sm text-slate-400 mb-1">Rate this session</div>
          <div className="flex items-center gap-2">
            <select value={score} onChange={e=>setScore(Number(e.target.value))} className="px-2 py-1 rounded bg-white/5 border border-white/10">
              {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
            </select>
            <input value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="Optional feedback" className="flex-1 px-2 py-1 rounded bg-white/5 border border-white/10" />
            <button onClick={rate} className="px-3 py-1.5 rounded bg-indigo-500 text-white">Submit</button>
          </div>
        </div>
      )}
    </div>
  )
}
