// lib/supabase/server.ts - Local Auth (No Supabase)
import { createClient as createLocalClient } from './client'

export function createClient() {
  return createLocalClient()
}
