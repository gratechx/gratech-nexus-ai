"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
  Activity,
  Target,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react"

interface Agent {
  id: string
  user_id: string
  name: string
  type: string
  config: any
  status: "active" | "idle" | "error" | "paused" | "running"
  metrics: {
    tasks_completed: number
    success_rate: number
    uptime: number
  }
  created_at: string
  updated_at: string
}

export function AgentSwarm() {
  const [searchTerm, setSearchTerm] = useState("")
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAgents()
  }, [])

  async function loadAgents() {
    try {
      const res = await fetch("/api/agents")
      const data = await res.json()
      setAgents(data.agents || [])
    } catch (error) {
      console.error("[v0] Failed to load agents:", error)
    } finally {
      setLoading(false)
    }
  }

  async function createAgent() {
    const agentTypes = ["Research", "Development", "Analytics", "Creative", "Orchestration", "Security"]
    const randomType = agentTypes[Math.floor(Math.random() * agentTypes.length)]

    const newAgent = {
      name: `${randomType} Agent ${agents.length + 1}`,
      type: randomType,
      config: {
        model: "openai/gpt-4-turbo",
        capabilities: [],
      },
    }

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      })

      const data = await res.json()
      if (data.agent) {
        setAgents([data.agent, ...agents])
      }
    } catch (error) {
      console.error("[v0] Failed to create agent:", error)
    }
  }

  async function toggleAgent(agent: Agent) {
    const newStatus = agent.status === "active" ? "paused" : "active"

    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await res.json()
      if (data.agent) {
        setAgents(agents.map((a) => (a.id === agent.id ? data.agent : a)))
      }
    } catch (error) {
      console.error("[v0] Failed to update agent:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "running":
        return "bg-primary"
      case "idle":
        return "bg-muted-foreground"
      case "error":
        return "bg-destructive"
      case "paused":
        return "bg-accent"
      default:
        return "bg-muted"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "running":
        return <Activity className="w-3 h-3" />
      case "error":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <CheckCircle2 className="w-3 h-3" />
    }
  }

  const activeAgents = agents.filter((a) => a.status === "active" || a.status === "running").length
  const totalTasks = agents.reduce((sum, a) => sum + (a.metrics?.tasks_completed || 0), 0)
  const avgSuccess =
    agents.length > 0
      ? Math.round(agents.reduce((sum, a) => sum + (a.metrics?.success_rate || 0), 0) / agents.length)
      : 0

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="p-8 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Agent Swarm</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activeAgents} of {agents.length} agents active • {totalTasks} tasks completed
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={createAgent}>
                <Plus className="w-4 h-4 mr-2" />
                Deploy Agent
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search agents..."
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Agents</p>
                  <p className="text-xl font-bold text-foreground">{activeAgents}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                  <p className="text-xl font-bold text-foreground">{totalTasks}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Success</p>
                  <p className="text-xl font-bold text-foreground">{avgSuccess}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Agents</p>
                  <p className="text-xl font-bold text-foreground">{agents.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {agents.length === 0 ? (
            <Card className="p-12 text-center">
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Agents Yet</h3>
              <p className="text-muted-foreground mb-6">Deploy your first autonomous agent to get started</p>
              <Button onClick={createAgent} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Deploy First Agent
              </Button>
            </Card>
          ) : (
            <>
              {/* Agent Grid */}
              <div className="grid grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Bot className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div
                            className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(agent.status)} rounded-full border-2 border-background flex items-center justify-center`}
                          >
                            {(agent.status === "active" || agent.status === "running") && (
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{agent.name}</h3>
                          <p className="text-xs text-muted-foreground">{agent.type}</p>
                        </div>
                      </div>
                      <Badge
                        variant={agent.status === "active" || agent.status === "running" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {getStatusIcon(agent.status)}
                        <span className="ml-1">{agent.status}</span>
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Tasks</p>
                          <p className="text-sm font-bold text-foreground">{agent.metrics?.tasks_completed || 0}</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Success</p>
                          <p className="text-sm font-bold text-primary">{agent.metrics?.success_rate || 0}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground">Uptime</p>
                          <p className="text-sm font-bold text-foreground">{agent.metrics?.uptime || 0}h</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {agent.status === "active" || agent.status === "running" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => toggleAgent(agent)}
                        >
                          <Pause className="w-3 h-3 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => toggleAgent(agent)}
                        >
                          <Play className="w-3 h-3 mr-2" />
                          Start
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Settings className="w-3 h-3 mr-2" />
                        Config
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Activity Feed */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {agents.slice(0, 4).map((agent, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{agent.name}</span> is {agent.status}
                        </p>
                        <p className="text-xs text-muted-foreground">{new Date(agent.updated_at).toLocaleString()}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
