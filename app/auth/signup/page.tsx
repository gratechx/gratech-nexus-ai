"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brain, Zap } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({ email, password })
      
      if (error) throw error
      
      // حفظ اسم العرض
      if (typeof window !== 'undefined') {
        localStorage.setItem('gratech_display_name', displayName)
      }
      
      // توجيه للـ Chat مباشرة
      router.push("/chat")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "حدث خطأ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background neural-grid p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center mb-4">
            <div className="flex items-center gap-2 text-primary">
              <Brain className="h-10 w-10" />
              <Zap className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              GraTech Nexus
            </h1>
            <p className="text-muted-foreground text-sm">AI Superplatform</p>
          </div>

          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">إنشاء حساب</CardTitle>
              <CardDescription>انضم لمستقبل الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="displayName">الاسم</Label>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="سليمان الشمري"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">الإيميل</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@gratech.sa"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="8 حروف على الأقل"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  عندك حساب؟{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    سجل دخول
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
