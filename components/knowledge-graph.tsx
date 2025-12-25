"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Network,
  Search,
  Plus,
  Filter,
  Download,
  Zap,
  FileText,
  Brain,
  Link2,
  TrendingUp,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"

interface GraphNode {
  id: string
  label: string
  node_type: "concept" | "entity" | "document" | "topic"
  properties: any
  created_at: string
}

interface GraphEdge {
  id: string
  source_id: string
  target_id: string
  relationship: string
  weight: number
}

export function KnowledgeGraph() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<GraphEdge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGraphData()
  }, [])

  async function loadGraphData() {
    try {
      const [nodesRes, edgesRes] = await Promise.all([fetch("/api/knowledge/nodes"), fetch("/api/knowledge/edges")])

      const nodesData = await nodesRes.json()
      const edgesData = await edgesRes.json()

      setNodes(nodesData.nodes || [])
      setEdges(edgesData.edges || [])
    } catch (error) {
      console.error("[v0] Failed to load graph data:", error)
    } finally {
      setLoading(false)
    }
  }

  async function addNode() {
    const newNode = {
      label: `Node ${nodes.length + 1}`,
      node_type: "concept",
      properties: {},
    }

    try {
      const res = await fetch("/api/knowledge/nodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNode),
      })

      const data = await res.json()
      if (data.node) {
        setNodes([...nodes, data.node])
      }
    } catch (error) {
      console.error("[v0] Failed to add node:", error)
    }
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case "concept":
        return "from-primary to-accent"
      case "entity":
        return "from-emerald-500 to-teal-500"
      case "topic":
        return "from-orange-500 to-amber-500"
      case "document":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-slate-500 to-gray-500"
    }
  }

  const getNodeConnections = (nodeId: string) => {
    return edges.filter((e) => e.source_id === nodeId || e.target_id === nodeId).length
  }

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
                  <Network className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Knowledge Graph</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Neural memory with {nodes.length} nodes and {edges.length} connections
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowLabels(!showLabels)} className="bg-transparent">
                {showLabels ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                Labels
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={addNode}>
                <Plus className="w-4 h-4 mr-2" />
                Add Node
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search knowledge graph..."
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {nodes.length === 0 ? (
            <Card className="p-12 text-center">
              <Network className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Knowledge Graph Yet</h3>
              <p className="text-muted-foreground mb-6">Start building your neural memory by adding nodes</p>
              <Button onClick={addNode} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create First Node
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {/* Graph Visualization */}
              <div className="col-span-2">
                <Card className="p-8 bg-gradient-to-br from-background to-card border-primary/20 h-[600px]">
                  <div className="relative h-full">
                    <svg className="absolute inset-0 w-full h-full">
                      {edges.map((edge, idx) => {
                        const sourceIdx = nodes.findIndex((n) => n.id === edge.source_id)
                        const targetIdx = nodes.findIndex((n) => n.id === edge.target_id)

                        if (sourceIdx === -1 || targetIdx === -1) return null

                        const angle1 = (sourceIdx * 360) / nodes.length
                        const angle2 = (targetIdx * 360) / nodes.length
                        const radius = 35

                        const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * radius
                        const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * radius
                        const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * radius
                        const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * radius

                        return (
                          <line
                            key={edge.id}
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            stroke="oklch(0.68 0.24 265)"
                            strokeWidth={edge.weight * 2}
                            opacity="0.3"
                          />
                        )
                      })}
                    </svg>

                    {nodes.map((node, index) => {
                      const angle = (index * 360) / nodes.length
                      const radius = 35
                      const x = 50 + Math.cos((angle * Math.PI) / 180) * radius
                      const y = 50 + Math.sin((angle * Math.PI) / 180) * radius

                      return (
                        <div
                          key={node.id}
                          className="absolute"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <button
                            onClick={() => setSelectedNode(node)}
                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${getNodeColor(node.node_type)} flex items-center justify-center border-2 border-background shadow-lg hover:scale-110 transition-transform cursor-pointer ${
                              selectedNode?.id === node.id ? "ring-4 ring-primary" : ""
                            }`}
                          >
                            {node.node_type === "document" ? (
                              <FileText className="w-5 h-5 text-white" />
                            ) : node.node_type === "entity" ? (
                              <Zap className="w-5 h-5 text-white" />
                            ) : (
                              <Brain className="w-5 h-5 text-white" />
                            )}
                          </button>
                          {showLabels && (
                            <p className="text-xs font-medium text-foreground text-center mt-2 w-20 truncate">
                              {node.label}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Card>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <span className="text-xs text-muted-foreground">Concept</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500" />
                    <span className="text-xs text-muted-foreground">Entity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-amber-500" />
                    <span className="text-xs text-muted-foreground">Topic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                    <span className="text-xs text-muted-foreground">Document</span>
                  </div>
                </div>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Selected Node Info */}
                {selectedNode ? (
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getNodeColor(selectedNode.node_type)} flex items-center justify-center`}
                        >
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{selectedNode.label}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {selectedNode.node_type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Connections</p>
                        <div className="flex items-center gap-2">
                          <Link2 className="w-4 h-4 text-primary" />
                          <span className="text-2xl font-bold text-foreground">
                            {getNodeConnections(selectedNode.id)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border space-y-2">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Link2 className="w-4 h-4 mr-2" />
                          View Connections
                        </Button>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <FileText className="w-4 h-4 mr-2" />
                          Edit Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 text-center">
                    <Network className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Select a node to view details</p>
                  </Card>
                )}

                {/* Graph Stats */}
                <Card className="p-6">
                  <h3 className="text-sm font-bold text-foreground mb-4">Graph Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Total Nodes</span>
                      <span className="text-sm font-bold text-foreground">{nodes.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Total Connections</span>
                      <span className="text-sm font-bold text-foreground">{edges.length}</span>
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-sm font-bold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Find Clusters
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Zap className="w-4 h-4 mr-2" />
                      Auto-Connect
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Analysis
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
