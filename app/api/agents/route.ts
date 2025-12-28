import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "agents.json")

// تأكد من وجود المجلد والملف
async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ agents: [] }, null, 2))
  }
}

async function readAgents() {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE, "utf-8")
  return JSON.parse(data)
}

async function writeAgents(data: any) {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function GET() {
  try {
    const data = await readAgents()
    return NextResponse.json({ agents: data.agents })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, type, config } = body

    const data = await readAgents()
    
    const newAgent = {
      id: `agent_${Date.now()}`,
      user_id: "local",
      name,
      type,
      config: config || {},
      status: "idle",
      metrics: { tasks_completed: 0, success_rate: 0, uptime: 0 },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    data.agents.unshift(newAgent)
    await writeAgents(data)

    return NextResponse.json({ agent: newAgent })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


