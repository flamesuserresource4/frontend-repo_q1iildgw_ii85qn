export default function ComingSoon({ title='Feature' }){
  return (
    <div className="min-h-[60vh] grid place-items-center px-6 py-14">
      <div className="max-w-lg text-center p-8 rounded-2xl bg-white/10 border border-white/10">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-slate-300">Coming Soon — Feature not implemented yet.</p>
      </div>
    </div>
  )
}
