import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chat(){
  const { chatId } = useParams()
  const user = JSON.parse(localStorage.getItem('ss_user'))
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const [showModal, setShowModal] = useState(false)

  const load = async () => {
    const res = await fetch(`${API}/chat/messages/${chatId}`)
    const data = await res.json()
    setMessages(data.messages || [])
  }

  useEffect(()=>{ load(); const i = setInterval(load, 2000); return ()=> clearInterval(i) },[chatId])

  const send = async () => {
    if(!text.trim()) return
    await fetch(`${API}/chat/send`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({chat_id: chatId, sender_id: user.user_id, text})})
    setText('')
    load()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="p-6 rounded-2xl bg-white/10 border border-white/10 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {messages.map(m=> (
            <div key={m._id} className={`max-w-[70%] px-3 py-2 rounded-2xl ${m.sender_id===user.user_id? 'ml-auto bg-indigo-500/30 text-white' : 'bg-white/10 border border-white/10 text-slate-100'}`}>{m.text}</div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          <button onClick={send} className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
          <button onClick={()=> setShowModal(true)} className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-100 border border-emerald-400/40">Schedule Session</button>
        </div>
      </div>

      {showModal && <ScheduleModal chatId={chatId} onClose={()=> setShowModal(false)} />}
    </div>
  )
}

function ScheduleModal({ chatId, onClose }){
  const user = JSON.parse(localStorage.getItem('ss_user'))
  const [duration, setDuration] = useState(30)
  const [time, setTime] = useState('')
  const [meet, setMeet] = useState('')
  const [zoom, setZoom] = useState('')

  const create = async () => {
    const res = await fetch(`${API}/sessions/schedule`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chat_id: chatId, teacher_id: user.user_id, learner_id: 'other', duration, scheduled_time: time, meet_link: meet, zoom_link: zoom })})
    const data = await res.json()
    if(res.ok){ onClose() }
  }

  return (
    <div className="fixed inset-0 bg-black/60 grid place-items-center p-4">
      <div className="w-full max-w-md p-5 rounded-2xl bg-slate-900 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Schedule Session</h3>
        <div className="space-y-3">
          <select value={duration} onChange={e=>setDuration(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <option value={30}>30 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
          <input value={time} onChange={e=>setTime(e.target.value)} placeholder="ISO Time e.g., 2025-01-01T18:00" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          <input value={meet} onChange={e=>setMeet(e.target.value)} placeholder="Google Meet link (optional)" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          <input value={zoom} onChange={e=>setZoom(e.target.value)} placeholder="Zoom link (optional)" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10" />
          <div className="flex gap-2 pt-2">
            <button onClick={create} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">Confirm</button>
            <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/10">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
