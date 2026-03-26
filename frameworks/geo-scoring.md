<geo_scoring>

## Purpose

Scoring formula for Generative Engine Optimization (GEO) — measures how well a website is optimized for AI search engines (ChatGPT, Perplexity, Google AI Overviews, Claude). Produces a GEO Score from 0-100 used by `tasks/geo.md`.

## The Formula

```
GEO Score = (AI_Citability × 0.25)
           + (Brand_Authority × 0.20)
           + (Content_Quality × 0.20)
           + (Technical_Foundations × 0.15)
           + (Structured_Data × 0.10)
           + (Platform_Optimization × 0.10)
```

Each category is scored 0-100. The weighted sum produces the final GEO Score.

## Score Interpretation

| Score | Rating | Meaning |
|-------|--------|---------|
| 0-40 | Invisible | AI search engines rarely or never cite this content |
| 41-60 | Partially Optimized | Some content is citable but significant gaps exist |
| 61-80 | Well Optimized | Content regularly appears in AI-generated answers |
| 81-100 | Excellent | Actively cited, high authority, strong AI visibility |

## Category Scoring Criteria

### AI Citability & Visibility (25%)

Measures whether content can be extracted and cited by AI systems.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| Citable passages exist | 0-25 | Self-contained paragraphs of 134-167 words |
| Direct answer format | 0-25 | Content answers questions without requiring context |
| Fact density | 0-25 | Contains concrete data, statistics, definitions |
| Source attribution | 0-25 | Claims are backed by verifiable sources |

**Citable passage characteristics:**
- 134-167 words (optimal AI citation length)
- Self-contained — makes sense without surrounding text
- Fact-rich — contains specific numbers, dates, names
- Answers a specific question directly

### Brand Authority Signals (20%)

Measures external signals that AI systems use to validate authority.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| Wikipedia presence | 0-20 | Entity has Wikipedia article or mention |
| Platform presence | 0-30 | Listed on: YouTube, Reddit, LinkedIn, GitHub, Crunchbase, G2, Trustpilot, ProductHunt |
| Backlink quality | 0-25 | Referenced by authoritative domains |
| Consistent NAP | 0-25 | Name, Address, Phone consistent across platforms |

### Content Quality & E-E-A-T (20%)

Measures Experience, Expertise, Authoritativeness, Trustworthiness.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| Experience signals | 0-25 | First-hand experience demonstrated in content |
| Author credentials | 0-25 | Author bio, about page, expertise visible |
| Content freshness | 0-25 | Updated within last 6 months, dates visible |
| Trust signals | 0-25 | HTTPS, privacy policy, contact info, reviews |

### Technical Foundations (15%)

Measures technical accessibility for AI crawlers.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| AI crawlers allowed | 0-30 | robots.txt allows GPTBot, ClaudeBot, PerplexityBot |
| llms.txt present | 0-20 | `/llms.txt` file exists and is well-structured |
| Page speed | 0-25 | Core Web Vitals pass (LCP < 2.5s, CLS < 0.1) |
| Clean HTML | 0-25 | Semantic HTML, proper heading hierarchy, no render-blocking |

### Structured Data (10%)

Measures schema markup quality.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| Schema.org present | 0-30 | Relevant schema types implemented |
| Validation | 0-30 | No errors in structured data testing |
| Completeness | 0-40 | All recommended fields populated |

### Platform Optimization (10%)

Measures optimization for specific AI platforms.

| Criterion | Points | Condition |
|-----------|--------|-----------|
| ChatGPT readiness | 0-25 | Entity recognition, verifiable facts, Wikipedia |
| Perplexity readiness | 0-25 | Cited sources, recent data, structured answers |
| Google AIO readiness | 0-25 | Featured snippet format, PAA coverage, schema |
| Claude readiness | 0-25 | Clear context, direct answers, topical authority |

## Quick Win Identification

After scoring, identify the top 3 improvements with highest impact-to-effort ratio:

| Impact | Effort | Priority |
|--------|--------|----------|
| High | Low | Do first — maximum ROI |
| High | High | Plan and schedule |
| Low | Low | Do if time permits |
| Low | High | Skip or defer |

</geo_scoring>
