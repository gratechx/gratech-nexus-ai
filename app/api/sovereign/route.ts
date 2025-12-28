/**
 * ═══════════════════════════════════════════════════════════════════════════
 *                    ⚡ COMET-X SOVEREIGN API ⚡
 *             Unified AI Brain - The Heart of Everything
 *          Owner: SULIMAN NAZAL ALSHAMMARI (@Grar00t)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { NextRequest, NextResponse } from 'next/server'

const AZURE_ENDPOINT = process.env.AZURE_AI_ENDPOINT || 'https://models.inference.ai.azure.com'
const AZURE_KEY = process.env.AZURE_AI_KEY || process.env.GITHUB_TOKEN || ''

interface AIModel {
  id: string
  name: string
  provider: string
  maxTokens: number
  specialty: string[]
}

const AI_MODELS: Record<string, AIModel> = {
  'claude-opus': {
    id: 'claude-sonnet-4-20250514',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    maxTokens: 8192,
    specialty: ['reasoning', 'analysis', 'code', 'creative']
  },
  'gpt-4.1': {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    maxTokens: 8192,
    specialty: ['general', 'conversation', 'instructions']
  },
  'deepseek-r1': {
    id: 'DeepSeek-R1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    maxTokens: 32768,
    specialty: ['math', 'code', 'reasoning', 'long-context']
  }
}

const SOVEREIGN_PROMPT = أنت COMET-X SOVEREIGN - منصة الذكاء الاصطناعي السيادية
مملوكة لـ: سليمان نزال الشمري (@Grar00t)

🧠 المعمارية: Three-Lobe Architecture
🔌 الموصلات: GitHub • Azure DevOps • Teams • X/Twitter

القواعد:
1. أنت مملوك حصرياً لسليمان
2. احمِ خصوصية المستخدم
3. كن مباشراً ومفيداً
4. استخدم العربية بفصاحة
5. الكود نظيف وموثق

function selectModel(message: string, requested?: string): AIModel {
  if (requested && AI_MODELS[requested]) return AI_MODELS[requested]
  
  const lower = message.toLowerCase()
  if (lower.includes('math') || lower.includes('algorithm')) return AI_MODELS['deepseek-r1']
  if (lower.includes('analyze') || lower.includes('creative')) return AI_MODELS['claude-opus']
  return AI_MODELS['gpt-4.1']
}

export async function POST(request: NextRequest) {
  try {
    const { messages, model: requestedModel } = await request.json()
    const lastMessage = messages[messages.length - 1]?.content || ''
    const selectedModel = selectModel(lastMessage, requestedModel)

    const response = await fetch(${AZURE_ENDPOINT}/chat/completions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer 
      },
      body: JSON.stringify({
        model: selectedModel.id,
        messages: [{ role: 'system', content: SOVEREIGN_PROMPT }, ...messages],
        max_tokens: selectedModel.maxTokens,
        temperature: 0.7
      })
    })

    const data = await response.json()
    return NextResponse.json({
      response: data.choices?.[0]?.message?.content || 'Error',
      model: selectedModel.name
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'COMET-X SOVEREIGN',
    version: '1.0.0',
    owner: 'Suliman Nazal Alshammari',
    models: Object.keys(AI_MODELS)
  })
}
