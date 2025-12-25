import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Zap, Network, Bot, Workflow, BarChart3, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background neural-grid">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-primary">
              <Brain className="h-16 w-16" />
              <Zap className="h-10 w-10" />
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
              GraTech Nexus
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              The Ultimate AI Superplatform. Multi-Brain Fusion, Autonomous Agents, and Intelligent Workflows.
            </p>

            <div className="flex gap-4 mt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8"
              >
                <Link href="/auth/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 text-lg px-8 bg-transparent"
              >
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="Multi-Brain Fusion"
              description="Combine GPT-4, Claude, Gemini, and more. Get the best answer from multiple AI models simultaneously."
            />
            <FeatureCard
              icon={<Network className="h-8 w-8" />}
              title="Knowledge Graph"
              description="Build interconnected knowledge networks with neural memory and semantic relationships."
            />
            <FeatureCard
              icon={<Bot className="h-8 w-8" />}
              title="Autonomous Agents"
              description="Deploy intelligent agents that work independently to complete complex tasks."
            />
            <FeatureCard
              icon={<Workflow className="h-8 w-8" />}
              title="Visual Workflows"
              description="Design and automate AI workflows with drag-and-drop simplicity."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Advanced Analytics"
              description="Track performance, costs, and insights across all AI operations."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Real-time Streaming"
              description="Experience lightning-fast AI responses with live streaming outputs."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-6 bg-card border-2 border-border hover:border-primary/50 rounded-xl transition-all hover:shadow-xl hover:shadow-primary/10">
      <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}
