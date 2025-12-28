'use client'

import { useRouter } from 'next/navigation'
import { Brain, Zap, Rocket, Crown, MessageSquare, LayoutDashboard } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  const enterPlatform = (path: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gratech_user', JSON.stringify({
        id: 'gratech-admin-001',
        email: 'admin@gratech.sa',
        name: 'سليمان الشمري'
      }))
    }
    router.push(path)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        <div className="flex justify-center items-center gap-4">
          <Crown className="h-20 w-20 text-yellow-400 animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          COMET-X SOVEREIGN
        </h1>
        
        <p className="text-2xl text-gray-300">Neural Sovereignty Platform</p>
        <p className="text-lg text-gray-400">مملوكة لـ سليمان نزال الشمري (@Grar00t)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 text-gray-400">
            <Brain className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <p className="font-semibold text-white">Three-Lobe</p>
            <p>معمارية عصبية</p>
          </div>
          <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20 text-gray-400">
            <Zap className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <p className="font-semibold text-white">Multi-AI</p>
            <p>Claude + GPT + DeepSeek</p>
          </div>
          <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20 text-gray-400">
            <Rocket className="w-8 h-8 mx-auto mb-2 text-pink-400" />
            <p className="font-semibold text-white">Connectors</p>
            <p>GitHub + Azure</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button onClick={() => enterPlatform('/sovereign')} className="flex items-center justify-center gap-3 text-xl px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl shadow-purple-500/50 hover:scale-105 transition-all text-white">
            <MessageSquare className="w-6 h-6" />
            Sovereign Chat
          </button>
          <button onClick={() => enterPlatform('/dashboard')} className="flex items-center justify-center gap-3 text-xl px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-2xl shadow-cyan-500/50 hover:scale-105 transition-all text-white">
            <LayoutDashboard className="w-6 h-6" />
            Dashboard
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mt-8">COMET-X SOVEREIGN v1.0.0 • Azure AI Foundry</p>
      </div>
    </div>
  )
}
