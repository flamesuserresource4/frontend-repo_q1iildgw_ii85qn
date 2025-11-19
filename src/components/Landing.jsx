import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/30 to-emerald-400/30 rounded-full blur-3xl" />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5}} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Learn fast. Teach faster. Trade Skill Coins.
          </motion.h1>
          <p className="mt-5 text-slate-300 text-lg leading-relaxed">
            SkillSwap is the premium marketplace for exchanging skills. Earn coins by teaching. Spend coins to learn. Match instantly with people who want what you offer.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/auth" className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/20">Get Started</Link>
            <a href="#features" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold">Explore</a>
          </div>
        </div>
        <div className="relative h-[420px] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
          <Spline scene="https://prod.spline.design/5wIiiHG1UAvlEZVn/scene.splinecode" />
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-6">
        {[
          {title:'Smart Matches',desc:'We pair your learn goals with someone’s teach skills—and vice versa.'},
          {title:'Chat + Schedule',desc:'Polished 1:1 conversations and effortless session booking.'},
          {title:'Coins & Badges',desc:'Teach to earn, learn to spend. Level up with streaks and top mentor.'},
        ].map((f,i)=> (
          <div key={i} className="p-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-xl">
            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-slate-300">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
