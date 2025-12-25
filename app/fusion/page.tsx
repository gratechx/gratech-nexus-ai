import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FusionEngine } from "@/components/fusion-engine"

export default async function FusionPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <FusionEngine userId={user.id} />
}
