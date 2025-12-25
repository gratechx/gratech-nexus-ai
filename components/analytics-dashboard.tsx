"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  DollarSign,
  Clock,
  Users,
  Brain,
  Target,
  Download,
  Filter,
  Calendar,
} from "lucide-react"

export function AnalyticsDashboard() {
  const stats = [
    {
      label: "Total Requests",
      value: "847,239",
      change: "+12.5%",
      trend: "up",
      icon: Activity,
      color: "from-primary to-accent",
    },
    {
      label: "AI Model Usage",
      value: "1.2M tokens",
      change: "+8.3%",
      trend: "up",
      icon: Brain,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Total Cost",
      value: "$2,847.50",
      change: "-5.2%",
      trend: "down",
      icon: DollarSign,
      color: "from-orange-500 to-amber-500",
    },
    {
      label: "Avg Response Time",
      value: "324ms",
      change: "-15.8%",
      trend: "down",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
  ]

  const modelUsage = [
    { name: "GPT-4", usage: 35, cost: "$982", requests: 24500 },
    { name: "Claude 3.5", usage: 28, cost: "$743", requests: 19200 },
    { name: "Gemini Pro", usage: 22, cost: "$621", requests: 15800 },
    { name: "DeepSeek", usage: 15, cost: "$501", requests: 11400 },
  ]

  const recentActivity = [
    { time: "14:23", action: "Multi-brain fusion", user: "Admin", tokens: 1240, cost: "$0.12" },
    { time: "14:18", action: "Knowledge graph query", user: "User_42", tokens: 850, cost: "$0.08" },
    { time: "14:15", action: "Workflow execution", user: "Agent_Alpha", tokens: 2100, cost: "$0.21" },
    { time: "14:10", action: "Agent task completion", user: "Agent_Beta", tokens: 670, cost: "$0.06" },
    { time: "14:05", action: "Image generation", user: "User_17", tokens: 1500, cost: "$0.15" },
  ]

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="p-8 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary-foreground glow-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                  <p className="text-sm text-muted-foreground mt-1">Real-time platform performance and usage metrics</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="p-6 relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Usage Chart */}
            <Card className="col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Platform Activity</h3>
                  <p className="text-sm text-muted-foreground">Requests over time</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Daily
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Weekly
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Monthly
                  </Badge>
                </div>
              </div>

              {/* Simple Bar Chart Visualization */}
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 78, 82, 71, 88, 92, 85, 79, 94, 87, 91, 96].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative group">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${height}%` }}
                      />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                        <p className="text-xs font-semibold text-foreground">{28 + i} Dec</p>
                        <p className="text-xs text-muted-foreground">{Math.round(height * 120)} requests</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{28 + i}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cost Breakdown */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground">Cost Distribution</h3>
                <p className="text-sm text-muted-foreground">By model</p>
              </div>

              <div className="space-y-4">
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Total Monthly Cost</p>
                  <p className="text-3xl font-bold text-foreground">$2,847</p>
                  <Badge variant="secondary" className="mt-2">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -5.2% vs last month
                  </Badge>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "GPT-4", value: 35, color: "from-emerald-500 to-teal-500" },
                    { name: "Claude", value: 28, color: "from-orange-500 to-amber-500" },
                    { name: "Gemini", value: 22, color: "from-blue-500 to-cyan-500" },
                    { name: "DeepSeek", value: 15, color: "from-violet-500 to-purple-500" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-foreground">{item.name}</span>
                        <span className="text-xs font-bold text-primary">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Model Usage Details */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Model Performance</h3>
                <p className="text-sm text-muted-foreground">Detailed usage statistics</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {modelUsage.map((model, i) => (
                <Card key={i} className="p-4 bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{model.name}</h4>
                      <p className="text-xs text-muted-foreground">AI Model</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {model.usage}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Requests</span>
                      <span className="text-xs font-semibold text-foreground">{model.requests.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Cost</span>
                      <span className="text-xs font-semibold text-primary">{model.cost}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${model.usage}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">Latest platform operations</p>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-2">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {activity.user}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Tokens</p>
                      <p className="text-sm font-semibold text-foreground">{activity.tokens.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="text-sm font-semibold text-primary">{activity.cost}</p>
                    </div>
                    <div className="flex justify-end">
                      <Badge variant="secondary" className="text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-muted-foreground">+18.2% from last week</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">98.7%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp className="w-3 h-3 text-accent" />
                <span className="text-muted-foreground">+2.1% improvement</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AI Efficiency</p>
                  <p className="text-2xl font-bold text-foreground">94.3%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingDown className="w-3 h-3 text-destructive" />
                <span className="text-muted-foreground">-1.3% from target</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
