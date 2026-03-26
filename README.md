# 🔄 NeuralVaultFlow

> Session-based development workflow skill for Claude Code, powered by NeuralVaultCore persistent memory.

NeuralVaultFlow orchestrates the full development cycle — from brainstorming to deployment — with every step persisted across sessions via NeuralVaultCore.

![License](https://img.shields.io/badge/License-MIT-0D1117?style=flat-square&logo=opensourceinitiative&logoColor=4CAF50)
![Ecosystem](https://img.shields.io/badge/Ecosystem-NeuralVault-0D1117?style=flat-square&logo=anthropic&logoColor=9F7AEA)
![Platform](https://img.shields.io/badge/Platform-Claude_Code-0D1117?style=flat-square&logo=anthropic&logoColor=4488FF)

---

## 🚀 Installation

```bash
# Global — available in every workspace (recommended)
npx github:getobyte/NeuralVaultFlow --global

# Local — current project only
npx github:getobyte/NeuralVaultFlow --local
```

Then open Claude Code and type any `/nvc:` command.

---

## 🧩 Commands

### Development Flow

| Command | What it does |
|---------|-------------|
| `/nvc:brainstorm` | Structured requirements gathering — detects project type, asks targeted questions |
| `/nvc:plan` | Builds executable plans with acceptance criteria (Given/When/Then) |
| `/nvc:execute` | Executes plans step by step with mandatory verify loops |

### Quality Checks

| Command | What it does |
|---------|-------------|
| `/nvc:audit` | Static analysis — dead code, errors, consistency, security basics |
| `/nvc:review` | Opinionated code review — architecture, best practices, readability |

### Specialized Audits

| Command | What it does |
|---------|-------------|
| `/nvc:seo` | Technical SEO — meta tags, structured data, Core Web Vitals, indexability |
| `/nvc:geo` | AI search visibility — GEO Score 0–100, AI crawler access, E-E-A-T |
| `/nvc:perf` | Performance — frontend bundles, backend queries, infrastructure |
| `/nvc:security` | Security — OWASP Top 10, auth, data exposure, dependencies + exploit scenarios |

### Deployment

| Command | What it does |
|---------|-------------|
| `/nvc:deploy` | Pre-deployment gate — blocks deploy on CRITICAL failures |

---

## ⚙️ How It Works

Every command integrates with NeuralVaultCore for cross-session persistence:

1. Reads NVC context at start (`get_context`) to understand current project state
2. Brainstorm and plan results are saved to NVC automatically
3. Execute tracks step-by-step progress with verify loops stored in NVC
4. Audit, review, and specialized results are saved with dated keys for history

### NVC Key Conventions

| Key Pattern | Written by |
|-------------|-----------|
| `{project}:brainstorm` | `/nvc:brainstorm` |
| `{project}:plan-{name}` | `/nvc:plan` |
| `{project}:progress` | `/nvc:execute` |
| `{project}:audit-{date}` | `/nvc:audit` |
| `{project}:review-{date}` | `/nvc:review` |
| `{project}:seo-audit-{date}` | `/nvc:seo` |
| `{project}:geo-audit-{date}` | `/nvc:geo` |
| `{project}:deploy-check-{date}` | `/nvc:deploy` |

---

## 📋 Prerequisites

- **Claude Code** — CLI, desktop app, or IDE extension
- **NeuralVaultCore** — MCP server running and configured in Claude Code
- **Node.js 16+** — for installation

---

## 🌐 NeuralVault Ecosystem

| Component | Role |
|-----------|------|
| 🧠 [**NeuralVaultCore**](https://github.com/getobyte/NeuralVaultCore) | MCP memory server — the brain |
| ⚡ [**NeuralVaultSkill**](https://github.com/getobyte/NeuralVaultSkill) | Session memory automation — `/nvc:init` + `/nvc:end` |
| 🧹 [**NeuralVaultArchivist**](https://github.com/getobyte/NeuralVaultArchivist) | Memory consolidation — on-demand cleanup |
| 🛠️ [**NeuralSkillBuilder**](https://github.com/getobyte/NeuralSkillBuilder) | Skill builder — design, scaffold, audit |
| 🔄 **NeuralVaultFlow** *(you are here)* | Dev workflow — brainstorm to deploy |

---

<div align="center">

**NeuralVaultFlow** — Cyber-Draco Legacy  
Built by [getobyte](https://github.com/getobyte) · Romania 🇷🇴

</div>
