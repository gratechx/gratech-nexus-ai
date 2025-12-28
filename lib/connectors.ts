/**
 * COMET-X SOVEREIGN - Automation Connectors
 * Owner: SULIMAN NAZAL ALSHAMMARI (@Grar00t)
 */

export interface ConnectorResult {
  success: boolean
  data?: any
  error?: string
  connector: string
}

export class GitHubConnector {
  private token: string
  constructor(token: string) { this.token = token }

  async listRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
      headers: { Authorization: `Bearer ${this.token}` }
    })
    return { success: res.ok, data: await res.json(), connector: 'GitHub' }
  }

  async createIssue(repo: string, title: string, body: string) {
    const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body })
    })
    return { success: res.ok, data: await res.json(), connector: 'GitHub' }
  }
}

export class TeamsConnector {
  private webhookUrl: string
  constructor(webhookUrl: string) { this.webhookUrl = webhookUrl }

  async sendMessage(title: string, text: string) {
    const card = {
      '@type': 'MessageCard',
      themeColor: '1ABC9C',
      summary: title,
      sections: [{ activityTitle: title, text, markdown: true }]
    }
    const res = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    })
    return { success: res.ok, connector: 'Teams' }
  }
}

export class ConnectorManager {
  private connectors = new Map<string, any>()
  
  register(name: string, connector: any) { this.connectors.set(name.toLowerCase(), connector) }
  get(name: string) { return this.connectors.get(name.toLowerCase()) }
  list() { return Array.from(this.connectors.keys()) }
}

let manager: ConnectorManager | null = null
export function getConnectorManager() {
  if (!manager) manager = new ConnectorManager()
  return manager
}
