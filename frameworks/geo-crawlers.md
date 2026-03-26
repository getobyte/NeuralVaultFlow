<geo_crawlers>

## Purpose

Complete reference of AI crawlers that index web content for generative search engines. Used by `tasks/geo.md` to audit robots.txt configuration and recommend which crawlers to allow or block.

## AI Crawlers List

| Crawler | Operator | Purpose | Recommendation |
|---------|----------|---------|----------------|
| GPTBot | OpenAI | Training + ChatGPT web browsing | **Allow** — major AI search visibility |
| ChatGPT-User | OpenAI | ChatGPT real-time browsing (user-initiated) | **Allow** — direct user queries |
| ClaudeBot | Anthropic | Claude web access | **Allow** — growing AI search share |
| anthropic-ai | Anthropic | Training data collection | Allow or block based on training preference |
| PerplexityBot | Perplexity | Perplexity AI search indexing | **Allow** — high-citation AI search engine |
| GoogleExtended | Google | Gemini/Bard training | **Allow** — feeds Google AI Overviews |
| Google-Extended | Google | Alternate user-agent string | **Allow** — same as above |
| Amazonbot | Amazon | Alexa answers + Amazon search | Allow if relevant to business |
| FacebookBot | Meta | Meta AI features | Allow if Meta presence matters |
| cohere-ai | Cohere | Training data collection | Optional — lower direct visibility impact |
| CCBot | Common Crawl | Open training dataset used by many AI models | Allow — widely used for AI training |
| DuckAssistant | DuckDuckGo | DuckDuckGo AI answers | Allow — privacy-focused search |
| Omgilibot | Omgili | Discussion/forum indexing for AI | Optional |
| Bytespider | ByteDance | TikTok/Douyin AI features | Allow if targeting Asian markets |
| PetalBot | Huawei | Huawei search AI | Optional |
| YouBot | You.com | You.com AI search | Allow — AI-native search engine |

## Priority Tiers

### Tier 1 — Must Allow (highest visibility impact)
- GPTBot
- ChatGPT-User
- ClaudeBot
- PerplexityBot
- GoogleExtended

### Tier 2 — Recommended
- CCBot
- DuckAssistant
- YouBot
- Amazonbot

### Tier 3 — Situational
- anthropic-ai, cohere-ai (training only, no direct search visibility)
- FacebookBot, Bytespider, PetalBot, Omgilibot

## robots.txt Configuration

### Allow All AI Crawlers (Recommended for Maximum Visibility)

```
# AI Search Crawlers - Allowed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GoogleExtended
Allow: /

User-agent: CCBot
Allow: /

User-agent: DuckAssistant
Allow: /

User-agent: YouBot
Allow: /
```

### Selective Block (Allow Search, Block Training)

```
# Allow AI search browsing
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Block training-only crawlers
User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: CCBot
Disallow: /
```

### Block Specific Paths

```
# Allow AI crawlers but protect sensitive paths
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /internal/
```

## Audit Checklist

When auditing a robots.txt for GEO:

1. **Check for blanket blocks** — `User-agent: * / Disallow: /` blocks everything including AI crawlers
2. **Check each Tier 1 crawler** — Are GPTBot, ClaudeBot, PerplexityBot, GoogleExtended explicitly allowed or not mentioned (default allow)?
3. **Check for accidental blocks** — Some sites block all bots except Googlebot, inadvertently blocking AI crawlers
4. **Check path blocks** — Important content paths should not be blocked for AI crawlers
5. **Verify crawl-delay** — High crawl-delay values can reduce AI indexing frequency

## Impact of Blocking

| Blocked Crawler | Impact |
|-----------------|--------|
| GPTBot | Invisible to ChatGPT — largest AI user base |
| PerplexityBot | Not cited in Perplexity answers — high-intent search |
| ClaudeBot | Not accessible via Claude web features |
| GoogleExtended | May reduce presence in Google AI Overviews |
| All AI crawlers | Effectively invisible to AI search — GEO Score drops to near 0 on Technical Foundations |

</geo_crawlers>
