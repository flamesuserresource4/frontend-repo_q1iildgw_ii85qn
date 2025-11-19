import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, message: '' }
  }
  static getDerivedStateFromError(error){
    return { hasError: true, message: error?.message || 'Unknown error' }
  }
  componentDidCatch(error, info){
    console.error('App error:', error, info)
  }
  render(){
    if(this.state.hasError){
      return (
        <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0f172a',color:'#e2e8f0',padding:24}}>
          <div style={{maxWidth:640,width:'100%',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:16,padding:24}}>
            <h1 style={{fontSize:20,marginBottom:8}}>Something went wrong</h1>
            <p style={{opacity:.8,marginBottom:16}}>The app crashed while rendering. Please try a hard refresh. If it persists, share the console errors.</p>
            <code style={{display:'block',whiteSpace:'pre-wrap',background:'rgba(0,0,0,0.3)',padding:12,borderRadius:8}}>{this.state.message}</code>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <a href="/" style={{padding:'8px 12px',background:'#4f46e5',color:'#fff',borderRadius:8,textDecoration:'none'}}>Reload</a>
              <a href="/test" style={{padding:'8px 12px',background:'rgba(255,255,255,0.1)',color:'#fff',borderRadius:8,textDecoration:'none'}}>Health Check</a>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // Removed StrictMode to avoid double-mount flicker that can unmount 3D canvas components
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>,
)
