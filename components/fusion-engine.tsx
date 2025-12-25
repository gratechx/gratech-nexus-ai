"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Brain,
  Sparkles,
  Zap,
  Network,
  Activity,
  Play,
  Pause,
  RotateCw,
  Settings2,
  TrendingUp,
  LogOut,
  Bot,
  Workflow,
  BarChart3,
  Home,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ModelBrain {
  id: string
  name: string
  provider: string
  weight: number
  status: "active" | "idle" | "processing"
  confidence: number
  color: string
}

interface FusionEngineProps {
  userId: string
}

export function FusionEngine({ userId }: FusionEngineProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const [brains, setBrains] = useState<ModelBrain[]>([
    {
      id: "gpt4",
      name: "GPT-4o",
      provider: "OpenAI",
      weight: 30,
      status: "active",
      confidence: 92,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "claude",
      name: "Claude 3.5",
      provider: "Anthropic",
      weight: 25,
      status: "active",
      confidence: 88,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "gemini",
      name: "Gemini Pro",
      provider: "Google",
      weight: 25,
      status: "active",
      confidence: 85,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "deepseek",
      name: "DeepSeek V3",
      provider: "DeepSeek",
      weight: 20,
      status: "active",
      confidence: 90,
      color: "from-violet-500 to-purple-500",
    },
  ])

  const updateWeight = (id: string, newWeight: number) => {
    setBrains(brains.map((b) => (b.id === id ? { ...b, weight: newWeight } : b)))
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
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg">GraTech</span>
          </Link>

          <Button size="sm" className="w-full bg-sidebar-primary hover:bg-sidebar-primary/90" asChild>
            <Link href="/chat">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Chat
            </Link>
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <NavItem href="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavItem href="/chat" icon={<Sparkles className="w-4 h-4" />} label="Chat" />
          <NavItem href="/fusion" icon={<Brain className="w-4 h-4" />} label="Multi-Brain Fusion" active />
          <NavItem href="/knowledge" icon={<Network className="w-4 h-4" />} label="Knowledge Graph" />
          <NavItem href="/agents" icon={<Bot className="w-4 h-4" />} label="Agents" />
          <NavItem href="/workflows" icon={<Workflow className="w-4 h-4" />} label="Workflows" />
          <NavItem href="/analytics" icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />
        </nav>

        <div className="p-2 border-t border-sidebar-border space-y-1">
          <NavItem href="/settings" icon={<Settings2 className="w-4 h-4" />} label="Settings" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="p-8 border-b border-border bg-card">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary-foreground glow-pulse" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Neural Fusion Engine</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Multi-brain AI synthesis with weighted consensus
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsProcessing(!isProcessing)}
                  className="bg-transparent"
                >
                  {isProcessing ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Fusion
                    </>
                  )}
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Fusion Visualization */}
            <Card className="p-8 bg-gradient-to-br from-background to-card border-2 border-primary/20">
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold mb-2">Neural Synthesis Network</h2>
                <p className="text-sm text-muted-foreground">4 AI brains connected in parallel consensus mode</p>
              </div>

              <div className="relative h-80 flex items-center justify-center">
                <div className="absolute z-10">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center border-4 border-background shadow-2xl">
                    <div className="text-center">
                      <Network className="w-12 h-12 text-primary-foreground mx-auto mb-2 glow-pulse" />
                      <p className="text-xs font-bold text-primary-foreground">Fusion Core</p>
                    </div>
                  </div>
                  {isProcessing && (
                    <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20" />
                  )}
                </div>

                {brains.map((brain, index) => {
                  const angle = (index * 360) / brains.length
                  const radius = 180
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius

                  return (
                    <div
                      key={brain.id}
                      className="absolute"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                        <line
                          x1="0"
                          y1="0"
                          x2={-x}
                          y2={-y}
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          strokeDasharray={isProcessing ? "5,5" : "0"}
                          className={isProcessing ? "animate-pulse" : ""}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "oklch(0.68 0.24 265)", stopOpacity: 0.5 }} />
                            <stop offset="100%" style={{ stopColor: "oklch(0.52 0.22 285)", stopOpacity: 0.2 }} />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div
                        className={`w-20 h-20 rounded-xl bg-gradient-to-br ${brain.color} flex items-center justify-center border-2 border-background shadow-lg ${
                          brain.status === "processing" ? "animate-pulse" : ""
                        }`}
                      >
                        <Brain className="w-8 h-8 text-white" />
                      </div>

                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-24">
                        <p className="text-xs font-semibold">{brain.name.split(" ")[0]}</p>
                        <p className="text-xs text-muted-foreground">{brain.weight}%</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Model Controls */}
            <div className="grid grid-cols-2 gap-6">
              {brains.map((brain) => (
                <Card key={brain.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${brain.color} flex items-center justify-center`}
                      >
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold">{brain.name}</h3>
                        <p className="text-xs text-muted-foreground">{brain.provider}</p>
                      </div>
                    </div>
                    <Badge
                      variant={brain.status === "active" ? "default" : "secondary"}
                      className={brain.status === "active" ? "bg-primary" : ""}
                    >
                      <Activity className="w-3 h-3 mr-1" />
                      {brain.status}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium">Fusion Weight</label>
                        <span className="text-xs font-bold text-primary">{brain.weight}%</span>
                      </div>
                      <Slider
                        value={[brain.weight]}
                        onValueChange={(value) => updateWeight(brain.id, value[0])}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-medium">Confidence Score</label>
                        <span className="text-xs font-bold text-accent">{brain.confidence}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${brain.color} transition-all`}
                          style={{ width: `${brain.confidence}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Latency</p>
                        <p className="text-sm font-semibold">245ms</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Tokens</p>
                        <p className="text-sm font-semibold">1.2K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Cost</p>
                        <p className="text-sm font-semibold">$0.03</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Fusion Settings */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Settings2 className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-bold">Fusion Configuration</h3>
                    <p className="text-xs text-muted-foreground">Advanced synthesis parameters</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Reset to Default
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Consensus Threshold</label>
                  <div className="flex items-center gap-3">
                    <Slider defaultValue={[75]} max={100} step={5} className="flex-1" />
                    <span className="text-xs font-bold text-primary w-12">75%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Temperature</label>
                  <div className="flex items-center gap-3">
                    <Slider defaultValue={[70]} max={100} step={10} className="flex-1" />
                    <span className="text-xs font-bold text-primary w-12">0.7</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Max Tokens</label>
                  <div className="flex items-center gap-3">
                    <Slider defaultValue={[4000]} max={8000} step={1000} className="flex-1" />
                    <span className="text-xs font-bold text-primary w-12">4K</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Requests</p>
                    <p className="text-xl font-bold">2,847</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Confidence</p>
                    <p className="text-xl font-bold">88.7%</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Latency</p>
                    <p className="text-xl font-bold">312ms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                    <p className="text-xl font-bold">$42.50</p>
                  </div>
                </div>
              </Card>
            </div>
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
