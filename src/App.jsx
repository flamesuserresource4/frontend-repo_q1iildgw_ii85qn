import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Landing from './components/Landing'
import Auth from './components/Auth'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import Matches from './components/Matches'
import Chat from './components/Chat'
import Sessions from './components/Sessions'
import Leaderboard from './components/Leaderboard'
import ComingSoon from './components/ComingSoon'
import Navbar from './components/Navbar'

const getUser = () => {
  try { return JSON.parse(localStorage.getItem('ss_user')) } catch { return null }
}

function ProtectedRoute({ children }) {
  const user = getUser()
  if (!user) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const user = getUser()
    if (!user) navigate('/auth')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
        <Route path="/chat/:chatId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/community" element={<ComingSoon title="Community Posts" />} />
        <Route path="/challenges" element={<ComingSoon title="Skill Challenges" />} />
        <Route path="/ai" element={<ComingSoon title="AI Skill Suggestion" />} />
        <Route path="/certs" element={<ComingSoon title="Certificates" />} />
      </Routes>
    </div>
  )
}
