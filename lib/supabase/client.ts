// lib/supabase/client.ts - Local Auth (No Supabase)
// تم استبدال Supabase بنظام محلي

function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function createClient() {
  return {
    auth: {
      getUser: async () => {
        if (typeof window === 'undefined') return { data: { user: null }, error: null }
        const user = localStorage.getItem('gratech_user')
        return { data: { user: user ? JSON.parse(user) : null }, error: null }
      },
      signUp: async ({ email, password }: { email: string; password: string }) => {
        const user = { id: generateId(), email, created_at: new Date().toISOString() }
        localStorage.setItem('gratech_user', JSON.stringify(user))
        localStorage.setItem('gratech_users_' + email, JSON.stringify({ email, password }))
        return { data: { user }, error: null }
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const stored = localStorage.getItem('gratech_users_' + email)
        if (!stored) return { data: { user: null }, error: { message: 'المستخدم غير موجود' } }
        const userData = JSON.parse(stored)
        if (userData.password !== password) return { data: { user: null }, error: { message: 'كلمة المرور خاطئة' } }
        const user = { id: generateId(), email, created_at: new Date().toISOString() }
        localStorage.setItem('gratech_user', JSON.stringify(user))
        return { data: { user }, error: null }
      },
      signOut: async () => {
        localStorage.removeItem('gratech_user')
        return { error: null }
      },
      onAuthStateChange: (callback: any) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
      }
    },
    from: (table: string) => ({
      select: async () => ({ data: [], error: null }),
      insert: async (data: any) => ({ data, error: null }),
      update: async (data: any) => ({ data, error: null }),
      delete: async () => ({ data: null, error: null }),
      eq: function() { return this },
      single: async () => ({ data: null, error: null })
    })
  }
}
