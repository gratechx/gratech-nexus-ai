"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Zap, Shield, ChevronRight, Settings } from "lucide-react"

const models = [
  {
    id: "gpt4",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    enabled: true,
    color: "from-emerald-500 to-teal-500",
    capabilities: ["Text", "Code", "Analysis"],
  },
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    enabled: true,
    color: "from-orange-500 to-amber-500",
    capabilities: ["Text", "Analysis", "Reasoning"],
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    provider: "Google",
    enabled: true,
    color: "from-blue-500 to-cyan-500",
    capabilities: ["Text", "Vision", "Multimodal"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    enabled: true,
    color: "from-violet-500 to-purple-500",
    capabilities: ["Code", "Math", "Reasoning"],
  },
  {
    id: "local",
    name: "Local Model",
    provider: "On-Device",
    enabled: false,
    color: "from-slate-500 to-gray-500",
    capabilities: ["Privacy", "Offline"],
  },
]

export function ModelSelector() {
  const [activeModels, setActiveModels] = useState(models)

  const toggleModel = (id: string) => {
    setActiveModels(activeModels.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)))
  }

  const enabledCount = activeModels.filter((m) => m.enabled).length

  return (
    <div className="w-80 border-l border-border bg-card flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Neural Fusion</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {enabledCount} of {models.length} models active
            </p>
          </div>
          <Button size="icon" variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Fusion Status */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground glow-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Fusion Active</p>
              <p className="text-xs text-muted-foreground">Multi-brain synthesis</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Models List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {activeModels.map((model) => (
          <Card key={model.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center`}
                >
                  {model.enabled ? (
                    <Sparkles className="w-5 h-5 text-white" />
                  ) : (
                    <Zap className="w-5 h-5 text-white opacity-50" />
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{model.name}</h4>
                  <p className="text-xs text-muted-foreground">{model.provider}</p>
                </div>
              </div>
              <Switch checked={model.enabled} onCheckedChange={() => toggleModel(model.id)} />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {model.capabilities.map((cap) => (
                <Badge key={cap} variant="secondary" className="text-xs">
                  {cap}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border space-y-3">
        <Button variant="outline" className="w-full justify-between bg-transparent">
          <span className="text-sm">Advanced Settings</span>
          <ChevronRight className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Sovereign AI • Privacy Protected</span>
        </div>
      </div>
    </div>
  )
}
