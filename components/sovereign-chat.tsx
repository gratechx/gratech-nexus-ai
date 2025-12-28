'use client'

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    💬 SOVEREIGN CHAT INTERFACE 💬
 *                      Enhanced with Three-Lobe
 *          Owner: SULIMAN NAZAL ALSHAMMARI (@Grar00t)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Brain, Zap, Settings } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
  timestamp: number
}

export default function SovereignChat({ userId = 'gratech-admin' }: { userId?: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('auto')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const models = [
    { id: 'auto', name: 'Auto Select', desc: 'ذكي' },
    { id: 'claude-opus', name: 'Claude Opus', desc: 'تحليل' },
    { id: 'gpt-4.1', name: 'GPT-4.1', desc: 'عام' },
    { id: 'deepseek-r1', name: 'DeepSeek R1', desc: 'كود' },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const saved = localStorage.getItem('sovereign_chat')
    if (saved) setMessages(JSON.parse(saved).slice(-50))
  }, [])

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem('sovereign_chat', JSON.stringify(messages))
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/sovereign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          model: selectedModel === 'auto' ? undefined : selectedModel,
          userId
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || data.error || 'Error',
        model: data.model,
        timestamp: Date.now()
      }])
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Error: ' + e.message, timestamp: Date.now() }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/30 bg-black/30">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-xl font-bold text-white">COMET-X SOVEREIGN</h1>
            <p className="text-xs text-gray-400">Neural Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-purple-500/30">
            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button onClick={() => { setMessages([]); localStorage.removeItem('sovereign_chat') }} className="px-4 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg">مسح</button>
          <a href="/dashboard" className="p-2 text-gray-400 hover:text-white"><Settings className="w-5 h-5" /></a>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">مرحباً سليمان! 👑</h2>
            <p className="text-gray-400">COMET-X SOVEREIGN جاهز</p>
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} className={lex gap-4 }>
            {m.role === 'assistant' && <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-6 h-6 text-white" /></div>}
            <div className={max-w-[70%] rounded-2xl px-4 py-3 }>
              <div className="whitespace-pre-wrap">{m.content}</div>
              {m.model && <div className="mt-2 text-xs text-purple-400 flex items-center gap-1"><Zap className="w-3 h-3" />{m.model}</div>}
            </div>
            {m.role === 'user' && <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"><User className="w-6 h-6 text-white" /></div>}
          </div>
        ))}
        {isLoading && <div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Bot className="w-6 h-6 text-white animate-pulse" /></div><div className="bg-gray-800 rounded-2xl px-4 py-3"><div className="flex gap-1"><div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" /><div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></div></div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-purple-500/30 bg-black/30">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="اكتب رسالتك..." className="flex-1 bg-gray-800 text-white px-6 py-4 rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-500" disabled={isLoading} />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl disabled:opacity-50"><Send className="w-6 h-6" /></button>
        </div>
      </div>
    </div>
  )
}
