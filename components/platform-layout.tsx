"use client"

import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Network,
  Workflow,
  Bot,
  Database,
  Settings,
  Menu,
  X,
  Sparkles,
  BarChart3,
  FileText,
  Zap,
} from "lucide-react"

interface PlatformLayoutProps {
  children: ReactNode
}

export function PlatformLayout({ children }: PlatformLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full glow-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">GraTech</h1>
              <p className="text-xs text-muted-foreground">Neural Nexus</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem icon={Sparkles} label="Multi-Brain Fusion" active />
          <NavItem icon={Network} label="Knowledge Graph" />
          <NavItem icon={Bot} label="Agent Swarm" />
          <NavItem icon={Workflow} label="Workflow Builder" />
          <NavItem icon={Database} label="Neural Memory" />
          <NavItem icon={FileText} label="Documents" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={Zap} label="Automations" />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground">Vision 2030</p>
            <p className="text-sm font-medium text-foreground mt-1">Sovereign AI</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Workspace</h2>
              <p className="text-xs text-muted-foreground">5 models active • Neural fusion enabled</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="text-xs font-medium text-primary">Enterprise Tier</span>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Upgrade
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: any
  label: string
  active?: boolean
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </button>
  )
}
