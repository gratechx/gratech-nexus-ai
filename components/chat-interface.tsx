"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Plus,
  Sparkles,
  Brain,
  Code,
  ImageIcon,
  Video,
  Settings,
  LogOut,
  Network,
  Bot,
  Workflow,
  BarChart3,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ChatInterfaceProps {
  userId: string
}

export function ChatInterface({ userId }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const router = useRouter()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const handleSend = () => {
    if (!input.trim() || status !== "ready") return
    sendMessage({ text: input })
    setInput("")
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg">GraTech</span>
          </div>

          <Button size="sm" className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <NavItem href="/chat" icon={<Sparkles className="w-4 h-4" />} label="Chat" active />
          <NavItem href="/fusion" icon={<Brain className="w-4 h-4" />} label="Multi-Brain Fusion" />
          <NavItem href="/knowledge" icon={<Network className="w-4 h-4" />} label="Knowledge Graph" />
          <NavItem href="/agents" icon={<Bot className="w-4 h-4" />} label="Agents" />
          <NavItem href="/workflows" icon={<Workflow className="w-4 h-4" />} label="Workflows" />
          <NavItem href="/analytics" icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          <NavItem href="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background">
                  <Sparkles className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Multi-Brain Mode</h3>
                <p className="text-xs text-muted-foreground">Powered by GPT-4 • Fusion ready</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-xs font-medium text-primary">Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center max-w-2xl mx-auto">
              <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
                <Brain className="w-16 h-16 text-primary mx-auto" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to GraTech Nexus</h2>
                <p className="text-muted-foreground">
                  Your multi-brain AI assistant with advanced capabilities. Start by asking anything.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <SuggestionCard
                  title="Analyze Data"
                  description="Process complex datasets"
                  onClick={() => {
                    setInput("Help me analyze a dataset")
                    handleSend()
                  }}
                />
                <SuggestionCard
                  title="Write Code"
                  description="Generate any programming solution"
                  onClick={() => {
                    setInput("Write a React component")
                    handleSend()
                  }}
                />
                <SuggestionCard
                  title="Create Workflow"
                  description="Automate tasks with AI"
                  onClick={() => {
                    setInput("Help me create an automation workflow")
                    handleSend()
                  }}
                />
                <SuggestionCard
                  title="Research Topic"
                  description="Deep dive with knowledge graphs"
                  onClick={() => {
                    setInput("Research AI advancements")
                    handleSend()
                  }}
                />
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
              )}

              <Card
                className={`p-4 max-w-2xl ${
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border-2 border-border"
                }`}
              >
                {msg.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="text-sm leading-relaxed whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  }
                  return null
                })}
              </Card>

              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-medium">You</span>
                </div>
              )}
            </div>
          ))}

          {status === "streaming" && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-primary-foreground animate-pulse" />
              </div>
              <Card className="p-4 bg-card border-2 border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border bg-card">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <Code className="w-3 h-3 mr-1.5" />
                Code
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <ImageIcon className="w-3 h-3 mr-1.5" />
                Image
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <Video className="w-3 h-3 mr-1.5" />
                Video
              </Button>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                <Brain className="w-3 h-3 mr-1.5" />
                Agent
              </Button>
            </div>

            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything... Multi-brain fusion analyzes with multiple AI models"
                className="min-h-[60px] resize-none bg-background"
                disabled={status !== "ready"}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <Button
                onClick={handleSend}
                disabled={status !== "ready" || !input.trim()}
                className="self-end bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              {status === "streaming"
                ? "AI is generating response..."
                : "Neural fusion engine ready • Press Enter to send"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

function SuggestionCard({
  title,
  description,
  onClick,
}: {
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-card border-2 border-border hover:border-primary/50 rounded-lg text-left transition-all group"
    >
      <h4 className="text-sm font-semibold mb-1 group-hover:text-primary">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  )
}
