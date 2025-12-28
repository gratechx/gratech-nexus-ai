'use client'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    👑 SOVEREIGN DASHBOARD 👑
 *                      COMET-X COMMAND CENTER
 *          Owner: SULIMAN NAZAL ALSHAMMARI (@Grar00t)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect } from 'react'
import { Brain, Zap, Shield, GitBranch, MessageSquare, Settings, Activity } from 'lucide-react'

interface SystemStatus {
  threeLobe: 'active' | 'standby' | 'error'
  connectors: { name: string; status: 'connected' | 'disconnected' }[]
  aiModels: { name: string; ready: boolean }[]
  memory: { entries: number; size: string }
}

export default function SovereignDashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    threeLobe: 'active',
    connectors: [
      { name: 'GitHub', status: 'connected' },
      { name: 'Azure DevOps', status: 'disconnected' },
      { name: 'Teams', status: 'disconnected' },
      { name: 'X/Twitter', status: 'disconnected' }
    ],
    aiModels: [
      { name: 'Claude Opus 4.5', ready: true },
      { name: 'GPT-4.1', ready: true },
      { name: 'DeepSeek R1', ready: true }
    ],
    memory: { entries: 0, size: '0 KB' }
  })

  useEffect(() => {
    // تحميل حالة الذاكرة
    const memories = localStorage.getItem('comet_memories')
    if (memories) {
      const parsed = JSON.parse(memories)
      setStatus(prev => ({
        ...prev,
        memory: {
          entries: parsed.length,
          size: (new Blob([memories]).size / 1024).toFixed(1) + ' KB'
        }
      }))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          👑 COMET-X SOVEREIGN
        </h1>
        <p className="text-gray-400 mt-2">Neural Sovereignty Platform • مملوكة لسليمان نزال الشمري</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {/* Three-Lobe Status */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h2 className="text-xl font-semibold">Three-Lobe Architecture</h2>
          </div>
          <div className="space-y-3">
            <StatusItem 
              name="Executive Lobe" 
              status="active" 
              description="القيادة والتنسيق"
              color="cyan"
            />
            <StatusItem 
              name="Sensory Lobe" 
              status="active" 
              description="الحماية والفلترة"
              color="green"
            />
            <StatusItem 
              name="Cognitive Lobe" 
              status="active" 
              description="الذكاء والتحليل"
              color="purple"
            />
          </div>
        </div>

        {/* AI Models */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h2 className="text-xl font-semibold">AI Models</h2>
          </div>
          <div className="space-y-3">
            {status.aiModels.map(model => (
              <div key={model.name} className="flex items-center justify-between">
                <span>{model.name}</span>
                <span className={px-2 py-1 rounded text-xs }>
                  {model.ready ? '✓ Ready' : '✗ Offline'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Connectors */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="w-8 h-8 text-pink-400" />
            <h2 className="text-xl font-semibold">Connectors</h2>
          </div>
          <div className="space-y-3">
            {status.connectors.map(conn => (
              <div key={conn.name} className="flex items-center justify-between">
                <span>{conn.name}</span>
                <span className={w-3 h-3 rounded-full } />
              </div>
            ))}
          </div>
        </div>

        {/* Memory */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-400" />
            <h2 className="text-xl font-semibold">Memory System</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{status.memory.entries}</div>
              <div className="text-sm text-gray-400">Entries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{status.memory.size}</div>
              <div className="text-sm text-gray-400">Size</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-green-400" />
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton icon={<MessageSquare />} label="Chat" href="/chat" />
            <ActionButton icon={<GitBranch />} label="Repos" href="/repos" />
            <ActionButton icon={<Brain />} label="Memory" href="/memory" />
            <ActionButton icon={<Settings />} label="Settings" href="/settings" />
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>COMET-X SOVEREIGN v1.0.0 • Built with 💜 for سليمان نزال الشمري</p>
        <p className="mt-1">Three-Lobe Architecture • Azure AI Foundry</p>
      </div>
    </div>
  )
}

function StatusItem({ name, status, description, color }: { 
  name: string
  status: string
  description: string
  color: string 
}) {
  const colors: Record<string, string> = {
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  }
  return (
    <div className="flex items-center gap-3">
      <div className={w-2 h-2 rounded-full  animate-pulse} />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
    </div>
  )
}

function ActionButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a 
      href={href}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-sm">{label}</span>
    </a>
  )
}
