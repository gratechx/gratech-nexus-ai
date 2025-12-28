/**
 * ═══════════════════════════════════════════════════════════════
 *                    🧠 GRATECH MEMORY CORE 🧠
 *            نظام ذاكرة دائمة للـ AI Agents
 *            Owner: SULIMAN NAZAL ALSHAMMARI
 * ═══════════════════════════════════════════════════════════════
 */

import { promises as fs } from "fs"
import path from "path"

const MEMORY_DIR = path.join(process.cwd(), "data", "memory")
const MEMORY_FILE = path.join(MEMORY_DIR, "brain.json")

// ═══════════════════════════════════════════════════════════════
//                    MEMORY TYPES
// ═══════════════════════════════════════════════════════════════

export interface Memory {
  id: string
  type: "fact" | "preference" | "task" | "conversation" | "code" | "error" | "learning"
  content: string
  context?: string
  tags: string[]
  importance: number // 1-10
  created_at: string
  accessed_at: string
  access_count: number
}

export interface Brain {
  owner: {
    name: string
    email: string
    github: string
  }
  memories: Memory[]
  facts: Record<string, string>
  preferences: Record<string, string>
  learned_patterns: string[]
  error_solutions: Record<string, string>
  last_updated: string
}

// ═══════════════════════════════════════════════════════════════
//                    DEFAULT BRAIN
// ═══════════════════════════════════════════════════════════════

const DEFAULT_BRAIN: Brain = {
  owner: {
    name: "سليمان نزال الشمري | SULIMAN NAZAL ALSHAMMARI",
    email: "admin@gratech.sa",
    github: "gratechx"
  },
  memories: [],
  facts: {
    "owner_name": "سليمان نزال الشمري",
    "owner_title": "مؤسس GraTech - مهندس AI سيادي",
    "company": "GraTech.sa",
    "vision": "السيادة العصبية - Neural Sovereignty",
    "work_hours": "4000+ ساعة على المشروع",
    "device": "Surface Laptop 7 - ARM64 - Snapdragon X Elite",
    "github_main": "gratechx",
    "github_old": "Grar00t",
    "azure_academic": "alshammaris@ksau-hs.edu.sa",
    "azure_personal": "admin@gratech.sa",
    "ibm_partner": "IBM Partner Plus - admin@gratech.sa",
    "odoo_partner": "Odoo وكيل معتمد"
  },
  preferences: {
    "language": "العربية السعودية - وش، تبي، الحين، يالله",
    "code_style": "كود كامل جاهز للنسخ مع تعليقات عربية",
    "response_style": "مباشر، عملي، بدون لف ودوران",
    "confirmation": "فقط للحذف DELETE - البقية نفذ مباشرة",
    "error_handling": "لا تخفي الأخطاء - أظهرها واقترح حلول"
  },
  learned_patterns: [
    "سليمان يكره الهلوسة - لا تختلق أي شيء",
    "سليمان يحب الكود الجاهز - لا تعطيه نصف حل",
    "سليمان عنده موارد Azure مجانية على حساب الحكومة 😂",
    "Perplexity Comet حذف موارده - لا تحذف شيء بدون تأكيد",
    "سليمان يفضل Claude للعربي، GPT للكود، DeepSeek للتحليل"
  ],
  error_solutions: {
    "AZURE_AUTH_ERROR": "az login --use-device-code",
    "GITHUB_TOKEN_EXPIRED": "gh auth login --web",
    "NPM_INSTALL_FAILED": "Remove-Item node_modules -Recurse; npm install",
    "NEXT_BUILD_ERROR": "npm run build -- --debug",
    "COSMOS_THROTTLE": "انتظر 5 ثواني وحاول مرة ثانية"
  },
  last_updated: new Date().toISOString()
}

// ═══════════════════════════════════════════════════════════════
//                    MEMORY CLASS
// ═══════════════════════════════════════════════════════════════

export class MemoryCore {
  private brain: Brain = DEFAULT_BRAIN

  async init() {
    try {
      await fs.mkdir(MEMORY_DIR, { recursive: true })
      const data = await fs.readFile(MEMORY_FILE, "utf-8")
      this.brain = { ...DEFAULT_BRAIN, ...JSON.parse(data) }
    } catch {
      await this.save()
    }
  }

  async save() {
    this.brain.last_updated = new Date().toISOString()
    await fs.mkdir(MEMORY_DIR, { recursive: true })
    await fs.writeFile(MEMORY_FILE, JSON.stringify(this.brain, null, 2))
  }

  // ─────────── إضافة ذاكرة ───────────
  async remember(memory: Omit<Memory, "id" | "created_at" | "accessed_at" | "access_count">) {
    const newMemory: Memory = {
      ...memory,
      id: `mem_${Date.now()}`,
      created_at: new Date().toISOString(),
      accessed_at: new Date().toISOString(),
      access_count: 0
    }
    this.brain.memories.unshift(newMemory)
    
    // احتفظ بأهم 1000 ذاكرة فقط
    if (this.brain.memories.length > 1000) {
      this.brain.memories = this.brain.memories
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 1000)
    }
    
    await this.save()
    return newMemory
  }

  // ─────────── استرجاع ذاكرة ───────────
  async recall(query: string, limit = 10): Promise<Memory[]> {
    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\s+/)

    const scored = this.brain.memories.map(mem => {
      let score = 0
      const content = mem.content.toLowerCase()
      const tags = mem.tags.join(" ").toLowerCase()

      // مطابقة الكلمات
      queryWords.forEach(word => {
        if (content.includes(word)) score += 2
        if (tags.includes(word)) score += 3
      })

      // أهمية الذاكرة
      score += mem.importance

      // حداثة الاستخدام
      const daysSinceAccess = (Date.now() - new Date(mem.accessed_at).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceAccess < 1) score += 5
      else if (daysSinceAccess < 7) score += 2

      return { memory: mem, score }
    })

    const results = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(s => s.memory)

    // تحديث accessed_at
    for (const mem of results) {
      mem.accessed_at = new Date().toISOString()
      mem.access_count++
    }
    await this.save()

    return results
  }

  // ─────────── حقائق ثابتة ───────────
  getFact(key: string): string | undefined {
    return this.brain.facts[key]
  }

  async setFact(key: string, value: string) {
    this.brain.facts[key] = value
    await this.save()
  }

  getAllFacts(): Record<string, string> {
    return this.brain.facts
  }

  // ─────────── تفضيلات ───────────
  getPreference(key: string): string | undefined {
    return this.brain.preferences[key]
  }

  async setPreference(key: string, value: string) {
    this.brain.preferences[key] = value
    await this.save()
  }

  // ─────────── أنماط متعلمة ───────────
  async learnPattern(pattern: string) {
    if (!this.brain.learned_patterns.includes(pattern)) {
      this.brain.learned_patterns.push(pattern)
      await this.save()
    }
  }

  getPatterns(): string[] {
    return this.brain.learned_patterns
  }

  // ─────────── حلول الأخطاء ───────────
  getErrorSolution(error: string): string | undefined {
    // بحث بالكلمات المفتاحية
    for (const [key, solution] of Object.entries(this.brain.error_solutions)) {
      if (error.toUpperCase().includes(key)) {
        return solution
      }
    }
    return undefined
  }

  async learnErrorSolution(error: string, solution: string) {
    const key = error.toUpperCase().replace(/[^A-Z_]/g, "_").slice(0, 30)
    this.brain.error_solutions[key] = solution
    await this.save()
  }

  // ─────────── سياق للـ AI ───────────
  getContextForAI(): string {
    const facts = Object.entries(this.brain.facts)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n")

    const prefs = Object.entries(this.brain.preferences)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n")

    const patterns = this.brain.learned_patterns
      .map(p => `• ${p}`)
      .join("\n")

    const recentMemories = this.brain.memories
      .slice(0, 20)
      .map(m => `• [${m.type}] ${m.content}`)
      .join("\n")

    return `
═══════════════════════════════════════════════════════════════
                    🧠 MEMORY CONTEXT
═══════════════════════════════════════════════════════════════

📋 حقائق عن المالك:
${facts}

⚙️ تفضيلات:
${prefs}

🎓 أنماط متعلمة:
${patterns}

📝 ذكريات حديثة:
${recentMemories}

═══════════════════════════════════════════════════════════════
`
  }
}

// Singleton instance
export const memory = new MemoryCore()
