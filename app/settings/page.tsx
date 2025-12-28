"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Brain, ArrowLeft, Save, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    displayName: "سليمان الشمري",
    email: "admin@gratech.sa",
    defaultModel: "claude-opus-4-5",
    darkMode: true,
    saveHistory: true,
    streamResponses: true
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // تحميل الإعدادات من localStorage
    const savedSettings = localStorage.getItem('gratech_settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    const displayName = localStorage.getItem('gratech_display_name')
    if (displayName) {
      setSettings(s => ({ ...s, displayName }))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('gratech_settings', JSON.stringify(settings))
    localStorage.setItem('gratech_display_name', settings.displayName)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearHistory = () => {
    localStorage.removeItem('gratech_chat_history')
    alert('تم مسح سجل المحادثات')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/chat')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">الإعدادات</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>معلومات الحساب</CardTitle>
            <CardDescription>إعدادات حسابك الشخصي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">الاسم</Label>
              <Input
                id="displayName"
                value={settings.displayName}
                onChange={(e) => setSettings(s => ({ ...s, displayName: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">الإيميل</Label>
              <Input
                id="email"
                value={settings.email}
                onChange={(e) => setSettings(s => ({ ...s, email: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات الذكاء الاصطناعي</CardTitle>
            <CardDescription>تخصيص سلوك الـ AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="defaultModel">الموديل الافتراضي</Label>
              <select
                id="defaultModel"
                value={settings.defaultModel}
                onChange={(e) => setSettings(s => ({ ...s, defaultModel: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="claude-opus-4-5">Claude Opus 4.5 (للعربي والإبداع)</option>
                <option value="gpt-4.1">GPT-4.1 (للبرمجة)</option>
                <option value="DeepSeek-R1-0528">DeepSeek R1 (للتحليل)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>حفظ سجل المحادثات</Label>
                <p className="text-sm text-muted-foreground">حفظ المحادثات السابقة</p>
              </div>
              <Switch
                checked={settings.saveHistory}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, saveHistory: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>البث المباشر</Label>
                <p className="text-sm text-muted-foreground">عرض الردود أثناء الكتابة</p>
              </div>
              <Switch
                checked={settings.streamResponses}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, streamResponses: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>إدارة البيانات</CardTitle>
            <CardDescription>تحكم في بياناتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="destructive" onClick={handleClearHistory} className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              مسح سجل المحادثات
            </Button>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            {saved ? "تم الحفظ ✓" : "حفظ الإعدادات"}
          </Button>
          <Button variant="outline" onClick={() => router.push('/chat')}>
            رجوع للشات
          </Button>
        </div>
      </div>
    </div>
  )
}
