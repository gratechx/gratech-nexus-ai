# 🧠 GraTech Nexus AI

**Multi-Brain AI Platform | منصة الذكاء الاصطناعي متعدد العقول**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vision 2030](https://img.shields.io/badge/Vision-2030-success)](https://vision2030.gov.sa/)

---

## 🚀 Features

### 🧠 Multi-Brain Fusion
- **GPT-4 Turbo** - OpenAI's most capable model
- **Claude 3.5 Sonnet** - Anthropic's reasoning powerhouse
- **Gemini Pro** - Google's multimodal AI
- **DeepSeek** - Code & Math specialist
- **Local Model** - Privacy-first on-device AI

### 📊 Core Modules
- **💬 Chat** - Real-time AI conversations
- **🤖 Agents** - Autonomous AI workers
- **🔗 Knowledge Graph** - Connected intelligence
- **⚡ Workflows** - Automated pipelines
- **📈 Analytics** - Usage insights
- **🔐 Auth** - Secure authentication

---

## 🛠️ Tech Stack

```
Frontend:     Next.js 16 + React 19 + TypeScript
Styling:      Tailwind CSS 4 + Radix UI
Database:     Supabase (PostgreSQL)
AI:           Vercel AI SDK + Multiple Providers
Auth:         Supabase Auth
Deployment:   Vercel / Azure
```

---

## 📦 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/gratechx/gratech-nexus-ai.git
cd gratech-nexus-ai
pnpm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Keys
OPENAI_API_KEY=your-openai-key
```

### 3. Setup Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Run migrations (see `/scripts/`)
3. Copy URL and Anon Key to `.env.local`

### 4. Run Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Supabase Schema

### Tables Needed:

```sql
-- Users profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  config JSONB DEFAULT '{}',
  status TEXT DEFAULT 'idle',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workflows
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  nodes JSONB DEFAULT '[]',
  edges JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge nodes
CREATE TABLE knowledge_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  label TEXT NOT NULL,
  type TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  position JSONB DEFAULT '{"x": 0, "y": 0}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge edges
CREATE TABLE knowledge_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  source UUID REFERENCES knowledge_nodes(id),
  target UUID REFERENCES knowledge_nodes(id),
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_edges ENABLE ROW LEVEL SECURITY;

-- RLS Policies (user can only see their own data)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own messages" ON messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own agents" ON agents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own workflows" ON workflows FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own knowledge" ON knowledge_nodes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own edges" ON knowledge_edges FOR ALL USING (auth.uid() = user_id);
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Custom Domain

1. Add domain in Vercel Dashboard
2. Configure DNS:
   - `A` record → Vercel IP
   - `CNAME` www → cname.vercel-dns.com

---

## 📁 Project Structure

```
gratech-nexus-ai/
├── app/
│   ├── api/              # API routes
│   │   ├── chat/         # Chat endpoint
│   │   ├── agents/       # Agents CRUD
│   │   ├── workflows/    # Workflows CRUD
│   │   └── knowledge/    # Knowledge graph
│   ├── auth/             # Auth pages
│   ├── chat/             # Chat interface
│   ├── agents/           # Agents dashboard
│   ├── workflows/        # Workflow builder
│   ├── knowledge/        # Knowledge graph
│   ├── analytics/        # Analytics dashboard
│   └── fusion/           # Multi-brain fusion
├── components/
│   └── ui/               # Radix UI components
├── lib/
│   └── supabase/         # Supabase clients
├── styles/               # Global styles
└── public/               # Static assets
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `GOOGLE_AI_API_KEY` | Google Gemini key | ⬜ |
| `ANTHROPIC_API_KEY` | Claude API key | ⬜ |

---

## 🇸🇦 Vision 2030 Alignment

This project supports Saudi Arabia's Vision 2030 by:

- ✅ Building sovereign AI infrastructure
- ✅ Supporting local-first privacy
- ✅ Enabling digital transformation
- ✅ Creating Saudi-owned technology
- ✅ Professional enterprise standards

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

## 📞 Contact

- **Website**: [gratech.sa](https://gratech.sa)
- **Email**: admin@gratech.sa
- **GitHub**: [@gratechx](https://github.com/gratechx)

---

**Built with ❤️ in Saudi Arabia 🇸🇦**

**من الرماد ينهض العنقاء** 🔥
