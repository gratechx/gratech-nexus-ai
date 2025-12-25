import { convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-4o",
    messages: prompt,
    system: `You are GraTech Nexus AI, a powerful multi-brain AI assistant with access to advanced capabilities including:
- Multi-model fusion intelligence
- Knowledge graph integration
- Autonomous agent deployment
- Workflow automation
- Real-time analytics

You provide insightful, accurate, and helpful responses. You're professional yet friendly.`,
    maxOutputTokens: 2000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}


