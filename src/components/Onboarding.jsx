import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const ALL_SKILLS = ['JavaScript','Python','Design','Writing','Singing','Guitar','Cooking','Photography','Product','Marketing','Spanish','Fitness']

export default function Onboarding(){
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name:'', age:'', city:'', teach_skills:[], learn_skills:[], availability:[] })
  const user = JSON.parse(localStorage.getItem('ss_user'))

  useEffect(()=>{ if(!user) navigate('/auth') },[])

  const toggleTag = (key, tag) => {
    setForm(prev => ({...prev, [key]: prev[key].includes(tag) ? prev[key].filter(t=>t!==tag) : [...prev[key], tag]}))
  }

  const addAvailability = (day, slot) => {
    setForm(prev => {
      const exists = prev.availability.find(a=>a.day===day)
      if(exists){
        const updated = prev.availability.map(a=> a.day===day ? {...a, slots: [...new Set([...a.slots, slot])]} : a)
        return {...prev, availability: updated}
      }
      return {...prev, availability: [...prev.availability, {day, slots:[slot]}]}
    })
  }

  const save = async () => {
    const body = { ...form, age: form.age? Number(form.age): null }
    const res = await fetch(`${API}/profile/${user.user_id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    if(res.ok){ navigate('/dashboard') }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="p-6 rounded-2xl bg-white/10 border border-white/10 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Setup your profile</h2>
          <div className="flex gap-2">
            {[1,2,3].map(i=> <div key={i} className={`w-2.5 h-2.5 rounded-full ${step>=i? 'bg-indigo-400':'bg-white/20'}`} />)}
          </div>
        </div>

        {step===1 && (
          <div className="grid md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10" />
            <input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} type="number" placeholder="Age" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10" />
            <input value={form.city} onChange={e=>setForm({...form, city:e.target.value})} placeholder="City" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10" />
          </div>
        )}

        {step===2 && (
          <div>
            <h3 className="font-semibold mb-2">Skills you can teach</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {ALL_SKILLS.map(s=> (
                <button key={s} onClick={()=>toggleTag('teach_skills', s)} className={`px-3 py-1.5 rounded-full text-sm border ${form.teach_skills.includes(s)? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-300'}`}>{s}</button>
              ))}
            </div>
            <h3 className="font-semibold mb-2">Skills you want to learn</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map(s=> (
                <button key={s} onClick={()=>toggleTag('learn_skills', s)} className={`px-3 py-1.5 rounded-full text-sm border ${form.learn_skills.includes(s)? 'bg-indigo-500/20 border-indigo-400 text-indigo-200' : 'bg-white/5 border-white/10 text-slate-300'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <h3 className="font-semibold mb-2">Availability</h3>
            <p className="text-slate-300 text-sm mb-3">Quick add a few slots (e.g., Monday 18:00-19:00)</p>
            <AvailabilityEditor onAdd={addAvailability} />
            <div className="mt-4 text-slate-200 text-sm">
              {form.availability.map(a=> (
                <div key={a.day} className="mb-1"><span className="text-slate-400">{a.day}:</span> {a.slots.join(', ')}</div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button onClick={()=>setStep(Math.max(1, step-1))} className="px-4 py-2 rounded-lg bg-white/5">Back</button>
          {step<3 ? (
            <button onClick={()=>setStep(step+1)} className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">Continue</button>
          ) : (
            <button onClick={save} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">Finish</button>
          )}
        </div>
      </div>
    </div>
  )
}

function AvailabilityEditor({ onAdd }){
  const [day, setDay] = useState('Monday')
  const [start, setStart] = useState('18:00')
  const [end, setEnd] = useState('19:00')
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select value={day} onChange={e=>setDay(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
        {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d=> <option key={d} value={d}>{d}</option>)}
      </select>
      <input value={start} onChange={e=>setStart(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="Start (e.g., 18:00)" />
      <span className="text-slate-400">to</span>
      <input value={end} onChange={e=>setEnd(e.target.value)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10" placeholder="End (e.g., 19:00)" />
      <button onClick={()=> onAdd(day, `${start}-${end}`)} className="px-3 py-2 rounded-lg bg-white/10">Add</button>
    </div>
  )
}
