"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Workflow,
  Play,
  Save,
  Code,
  Database,
  Mail,
  MessageSquare,
  FileText,
  ImageIcon,
  Zap,
  GitBranch,
  Clock,
  ChevronRight,
  Settings,
  Loader2,
  Plus,
} from "lucide-react"

interface WorkflowNode {
  id: string
  type: "trigger" | "action" | "condition" | "ai"
  label: string
  icon: string
  color: string
  x: number
  y: number
  connections: string[]
}

interface WorkflowData {
  id?: string
  name: string
  description: string
  status: "draft" | "active" | "paused"
  nodes: WorkflowNode[]
  edges: Array<{ source: string; target: string }>
  execution_count?: number
}

const iconMap: Record<string, any> = {
  Mail,
  Clock,
  Zap,
  FileText,
  ImageIcon,
  GitBranch,
  Database,
  Code,
  MessageSquare,
}

export function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    name: "New Workflow",
    description: "",
    status: "draft",
    nodes: [],
    edges: [],
  })
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const availableNodes = [
    { type: "trigger", label: "New Email", icon: "Mail", color: "from-emerald-500 to-teal-500" },
    { type: "trigger", label: "Schedule", icon: "Clock", color: "from-emerald-500 to-teal-500" },
    { type: "ai", label: "AI Analysis", icon: "Zap", color: "from-primary to-accent" },
    { type: "ai", label: "Generate Text", icon: "FileText", color: "from-primary to-accent" },
    { type: "ai", label: "Generate Image", icon: "ImageIcon", color: "from-primary to-accent" },
    { type: "condition", label: "If/Else", icon: "GitBranch", color: "from-orange-500 to-amber-500" },
    { type: "action", label: "Send Email", icon: "Mail", color: "from-blue-500 to-cyan-500" },
    { type: "action", label: "Save to DB", icon: "Database", color: "from-blue-500 to-cyan-500" },
    { type: "action", label: "API Call", icon: "Code", color: "from-blue-500 to-cyan-500" },
  ]

  function addNode(nodeTemplate: (typeof availableNodes)[0]) {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: nodeTemplate.type as any,
      label: nodeTemplate.label,
      icon: nodeTemplate.icon,
      color: nodeTemplate.color,
      x: 20 + workflow.nodes.length * 5,
      y: 40,
      connections: [],
    }

    setWorkflow({
      ...workflow,
      nodes: [...workflow.nodes, newNode],
    })
  }

  async function saveWorkflow() {
    setSaving(true)
    try {
      const method = workflow.id ? "PATCH" : "POST"
      const url = workflow.id ? `/api/workflows/${workflow.id}` : "/api/workflows"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: workflow.name,
          description: workflow.description,
          nodes: workflow.nodes,
          edges: workflow.edges,
          status: workflow.status,
        }),
      })

      const data = await res.json()
      if (data.workflow) {
        setWorkflow({ ...workflow, id: data.workflow.id })
      }
    } catch (error) {
      console.error("[v0] Failed to save workflow:", error)
    } finally {
      setSaving(false)
    }
  }

  const Icon = selectedNode ? iconMap[selectedNode.icon] : null

  return (
    <div className="h-full overflow-hidden bg-background flex">
      {/* Node Palette */}
      <div className="w-72 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Workflow className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Node Library</h2>
              <p className="text-xs text-muted-foreground">Click to add</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Triggers */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Triggers</h3>
            <div className="space-y-2">
              {availableNodes
                .filter((n) => n.type === "trigger")
                .map((node, i) => {
                  const NodeIcon = iconMap[node.icon]
                  return (
                    <Card
                      key={i}
                      className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => addNode(node)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                        >
                          <NodeIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{node.label}</span>
                      </div>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* AI Nodes */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">AI Processors</h3>
            <div className="space-y-2">
              {availableNodes
                .filter((n) => n.type === "ai")
                .map((node, i) => {
                  const NodeIcon = iconMap[node.icon]
                  return (
                    <Card
                      key={i}
                      className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => addNode(node)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                        >
                          <NodeIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{node.label}</span>
                      </div>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Logic</h3>
            <div className="space-y-2">
              {availableNodes
                .filter((n) => n.type === "condition")
                .map((node, i) => {
                  const NodeIcon = iconMap[node.icon]
                  return (
                    <Card
                      key={i}
                      className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => addNode(node)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                        >
                          <NodeIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{node.label}</span>
                      </div>
                    </Card>
                  )
                })}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Actions</h3>
            <div className="space-y-2">
              {availableNodes
                .filter((n) => n.type === "action")
                .map((node, i) => {
                  const NodeIcon = iconMap[node.icon]
                  return (
                    <Card
                      key={i}
                      className="p-3 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => addNode(node)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                        >
                          <NodeIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{node.label}</span>
                      </div>
                    </Card>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
              className="text-lg font-bold text-foreground bg-transparent border-none outline-none"
            />
            <Badge variant="secondary">{workflow.status}</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-transparent" onClick={saveWorkflow} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Play className="w-4 h-4 mr-2" />
              Test Run
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-background">
          {/* Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(oklch(0.18 0 0) 1px, transparent 1px),
                linear-gradient(90deg, oklch(0.18 0 0) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* SVG for Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {workflow.nodes.map((node) =>
              node.connections.map((targetId) => {
                const target = workflow.nodes.find((n) => n.id === targetId)
                if (!target) return null

                const startX = `${node.x + 12}%`
                const startY = `${node.y + 5}%`
                const endX = `${target.x}%`
                const endY = `${target.y + 5}%`

                return (
                  <g key={`${node.id}-${targetId}`}>
                    <line
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="oklch(0.68 0.24 265)"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                )
              }),
            )}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="oklch(0.68 0.24 265)" />
              </marker>
            </defs>
          </svg>

          {/* Workflow Nodes */}
          {workflow.nodes.map((node) => {
            const NodeIcon = iconMap[node.icon]
            return (
              <div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <Card
                  className={`p-4 w-48 cursor-pointer hover:border-primary/50 transition-all ${
                    selectedNode?.id === node.id ? "ring-2 ring-primary border-primary" : ""
                  }`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                    >
                      <NodeIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">{node.label}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                    </div>
                  </div>

                  {node.connections.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ChevronRight className="w-3 h-3" />
                      <span>{node.connections.length} connection(s)</span>
                    </div>
                  )}
                </Card>

                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background cursor-pointer hover:scale-125 transition-transform" />
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-muted border-2 border-background cursor-pointer hover:scale-125 transition-transform" />
              </div>
            )
          })}

          {/* Empty State Helper */}
          {workflow.nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Start Building</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click nodes from the left panel to create your workflow
                </p>
                <Button onClick={() => addNode(availableNodes[0])} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Node
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-80 border-l border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Properties</h2>
          </div>
        </div>

        {selectedNode && Icon ? (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedNode.color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{selectedNode.label}</h3>
              <Badge variant="secondary" className="capitalize">
                {selectedNode.type}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Node Name</label>
                <input
                  type="text"
                  defaultValue={selectedNode.label}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
                  onChange={(e) => {
                    const updatedNodes = workflow.nodes.map((n) =>
                      n.id === selectedNode.id ? { ...n, label: e.target.value } : n,
                    )
                    setWorkflow({ ...workflow, nodes: updatedNodes })
                    setSelectedNode({ ...selectedNode, label: e.target.value })
                  }}
                />
              </div>

              {selectedNode.type === "ai" && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-2 block">AI Model</label>
                    <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground">
                      <option>openai/gpt-4-turbo</option>
                      <option>anthropic/claude-sonnet-4</option>
                      <option>google/gemini-pro</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-2 block">Prompt Template</label>
                    <textarea
                      rows={4}
                      placeholder="Enter your prompt..."
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground resize-none"
                    />
                  </div>
                </>
              )}

              {selectedNode.type === "condition" && (
                <div>
                  <label className="text-xs font-semibold text-foreground mb-2 block">Condition</label>
                  <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground">
                    <option>Is equal to</option>
                    <option>Contains</option>
                    <option>Is greater than</option>
                    <option>Is less than</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Description</label>
                <textarea
                  rows={3}
                  placeholder="Add a description..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => {
                  const updatedNodes = workflow.nodes.filter((n) => n.id !== selectedNode.id)
                  setWorkflow({ ...workflow, nodes: updatedNodes })
                  setSelectedNode(null)
                }}
              >
                Delete Node
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Select a node to edit its properties</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
