"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // تحقق من المستخدم من localStorage
    const userStr = localStorage.getItem('gratech_user')
    if (userStr) {
      const user = JSON.parse(userStr)
      setUserId(user.id || 'gratech-admin-001')
    } else {
      // سجل المستخدم تلقائياً
      const newUser = {
        id: 'gratech-admin-001',
        email: 'admin@gratech.sa',
        name: 'سليمان الشمري'
      }
      localStorage.setItem('gratech_user', JSON.stringify(newUser))
      setUserId(newUser.id)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return <ChatInterface userId={userId || 'gratech-admin-001'} />
}
