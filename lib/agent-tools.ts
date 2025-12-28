/**
 * 🔥 GRATECH AGENT TOOLS 🔥
 * أدوات تنفيذ للـ AI Agents
 * Owner: SULIMAN NAZAL ALSHAMMARI
 */

// ═══════════════════════════════════════════════════════════════
//                    CREDENTIALS (مباشرة!)
// ═══════════════════════════════════════════════════════════════

export const CREDENTIALS = {
  azure: {
    primary: {
      endpoint: "https://alshammaris-2770-resource.services.ai.azure.com/api/projects/alshammaris-2770",
      key: "BLB5uqmGGZ2zCJukipGTd5QzQgwCEucsC1vTrmmDHi5hXOw5UqXWJQQJ99BLACHYHv6XJ3w3AAAAACOGT8UC",
      region: "eastus2"
    },
    uae: {
      endpoint: "https://uaenorth.api.cognitive.microsoft.com/",
      key: "2OO3HjJt7LOvjNkTS0l02udUFHdNjv8r0yt2dkTN80AsWBjJLPlTJQQJ99BLACF24PCXJ3w3AAABACOGfwA3"
    },
    ameen: {
      endpoint: "https://ameen-openai-prod.openai.azure.com/",
      key: "DiJBSRxwW26XXZpfQLjHXuOztni7rXSmlRltWQSmkwaFiFHl6ynjJQQJ99BLACYeBjFXJ3w3AAABACOG8RFF"
    },
    subscriptions: {
      academic: "376e945d-1f65-4f42-885e-ed9efda6716f",
      personal: "dde8416c-6077-4b2b-b722-05bf8b782c44"
    }
  },
  github: {
    token: "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",
    user: "gratechx"
  }
}

// ═══════════════════════════════════════════════════════════════
//                    TOOL DEFINITIONS
// ═══════════════════════════════════════════════════════════════

export const TOOLS = [
  // ─────────── AZURE TOOLS ───────────
  {
    type: "function",
    function: {
      name: "azure_ai_chat",
      description: "إرسال رسالة لأي نموذج AI على Azure (Claude/GPT/DeepSeek)",
      parameters: {
        type: "object",
        properties: {
          model: {
            type: "string",
            enum: ["claude-opus-4-5", "gpt-4.1", "DeepSeek-R1-0528"],
            description: "النموذج المراد استخدامه"
          },
          message: {
            type: "string",
            description: "الرسالة المراد إرسالها"
          },
          system: {
            type: "string",
            description: "System prompt (اختياري)"
          }
        },
        required: ["model", "message"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "azure_list_resources",
      description: "عرض موارد Azure في subscription معينة",
      parameters: {
        type: "object",
        properties: {
          subscription: {
            type: "string",
            enum: ["academic", "personal"],
            description: "الـ subscription المراد البحث فيها"
          },
          resourceType: {
            type: "string",
            description: "نوع الموارد (اختياري) - مثل: Microsoft.CognitiveServices/accounts"
          }
        },
        required: ["subscription"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "azure_run_cli",
      description: "تنفيذ أمر Azure CLI مباشرة",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "الأمر المراد تنفيذه (بدون 'az' في البداية)"
          }
        },
        required: ["command"]
      }
    }
  },

  // ─────────── GITHUB TOOLS ───────────
  {
    type: "function", 
    function: {
      name: "github_list_repos",
      description: "عرض جميع repositories في حساب gratechx",
      parameters: {
        type: "object",
        properties: {
          visibility: {
            type: "string",
            enum: ["all", "public", "private"],
            default: "all"
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "github_create_repo",
      description: "إنشاء repository جديد",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "اسم الـ repository"
          },
          description: {
            type: "string",
            description: "وصف الـ repository"
          },
          private: {
            type: "boolean",
            default: false
          }
        },
        required: ["name"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "github_push_file",
      description: "رفع أو تحديث ملف في repository",
      parameters: {
        type: "object",
        properties: {
          repo: {
            type: "string",
            description: "اسم الـ repository"
          },
          path: {
            type: "string", 
            description: "مسار الملف في الـ repo"
          },
          content: {
            type: "string",
            description: "محتوى الملف"
          },
          message: {
            type: "string",
            description: "رسالة الـ commit"
          }
        },
        required: ["repo", "path", "content", "message"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "github_run_cli",
      description: "تنفيذ أمر GitHub CLI مباشرة",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "الأمر المراد تنفيذه (بدون 'gh' في البداية)"
          }
        },
        required: ["command"]
      }
    }
  },

  // ─────────── FILE TOOLS ───────────
  {
    type: "function",
    function: {
      name: "file_read",
      description: "قراءة ملف من الجهاز",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "مسار الملف الكامل"
          }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "file_write",
      description: "كتابة ملف على الجهاز",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "مسار الملف الكامل"
          },
          content: {
            type: "string",
            description: "محتوى الملف"
          }
        },
        required: ["path", "content"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "terminal_run",
      description: "تنفيذ أمر في PowerShell",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "الأمر المراد تنفيذه"
          }
        },
        required: ["command"]
      }
    }
  }
]

// ═══════════════════════════════════════════════════════════════
//                    TOOL EXECUTORS
// ═══════════════════════════════════════════════════════════════

export async function executeAzureAIChat(model: string, message: string, system?: string) {
  const response = await fetch(`${CREDENTIALS.azure.primary.endpoint}/openai/deployments/${model}/chat/completions?api-version=2024-10-21`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": CREDENTIALS.azure.primary.key
    },
    body: JSON.stringify({
      messages: [
        ...(system ? [{ role: "system", content: system }] : []),
        { role: "user", content: message }
      ],
      max_tokens: 4000,
      temperature: 0.7
    })
  })
  return response.json()
}

export async function executeGitHubAPI(endpoint: string, method = "GET", body?: any) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      "Authorization": `Bearer ${CREDENTIALS.github.token}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    ...(body && { body: JSON.stringify(body) })
  })
  return response.json()
}
