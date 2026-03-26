<purpose>
Perform a Generative Engine Optimization (GEO) audit — measuring and improving visibility in AI search engines like ChatGPT, Perplexity, Google AI Overviews, and Claude. Produces a GEO Score and prioritized optimization plan.
</purpose>

<user-story>
As a site owner, I want to know how visible my content is to AI search engines and what to improve, so that my brand appears in AI-generated answers.
</user-story>

<when-to-use>
- User runs /nvc:geo for AI search visibility audit
- When optimizing for AI-first search (ChatGPT, Perplexity, Google AIO)
- After SEO audit, as a complementary analysis
- When brand is not appearing in AI-generated answers
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@frameworks/geo-scoring.md (for scoring formula and criteria)
@frameworks/geo-crawlers.md (for AI crawler audit)
@frameworks/json-ld-schemas.md (for structured data recommendations)
@templates/geo-report.md (for report format)
</references>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project
2. Identify business type and primary audience
3. Check for existing SEO audit: `search_memories("seo", namespace, keys_only=True)`
4. Announce: "GEO audit start. Business: {type}. Scoring against AI search visibility criteria."
</step>

<step name="score_citability">
**AI Citability & Visibility (25% weight)**

Load @frameworks/geo-scoring.md for criteria.

1. Scan content for citable passages (134-167 words, self-contained, fact-rich)
2. Check if content answers questions directly without requiring external context
3. Assess fact density — concrete data, statistics, definitions
4. Check source attribution — are claims backed by verifiable sources?

Score 0-100 based on criteria in geo-scoring.md.
</step>

<step name="score_brand_authority">
**Brand Authority Signals (20% weight)**

Check presence on key platforms:

| Platform | Check |
|----------|-------|
| Wikipedia | Entity article or mention exists? |
| YouTube | Official channel with content? |
| Reddit | Brand discussions or official presence? |
| LinkedIn | Company page with activity? |
| GitHub | Organization or repos? |
| Crunchbase | Company profile? |
| G2 / Trustpilot | Reviews present? |
| ProductHunt | Product listed? |

Mark each as: Present / Absent / Needs Update.
Score 0-100 based on coverage and quality.
</step>

<step name="score_content_eeat">
**Content Quality & E-E-A-T (20% weight)**

1. **Experience** — evidence of first-hand experience in content
2. **Expertise** — author credentials visible (bio, about page, job title)
3. **Authoritativeness** — external mentions, quality backlinks
4. **Trustworthiness** — HTTPS, privacy policy, contact info, reviews

Score 0-100 based on criteria.
</step>

<step name="score_technical">
**Technical Foundations (15% weight)**

Load @frameworks/geo-crawlers.md for crawler list.

1. Audit robots.txt for each Tier 1 AI crawler (GPTBot, ClaudeBot, PerplexityBot, GoogleExtended)
2. Check for llms.txt file — if missing, recommend creating one
3. Verify Core Web Vitals pass
4. Check HTML cleanliness (semantic markup, heading hierarchy)

Score 0-100. Generate specific robots.txt recommendations if needed.
</step>

<step name="score_structured_data">
**Structured Data (10% weight)**

Load @frameworks/json-ld-schemas.md.

1. Check existing schema markup for errors
2. Assess completeness of populated fields
3. Recommend missing schemas based on business type

Score 0-100.
</step>

<step name="score_platform_optimization">
**Platform Optimization (10% weight)**

Assess readiness for each major AI platform:

1. **ChatGPT** — entity recognition, Wikipedia presence, verifiable facts
2. **Perplexity** — citable sources, recent data, structured answers
3. **Google AIO** — featured snippet format, PAA coverage, schema
4. **Claude** — clear context, direct answers, topical authority

Score 0-100.
</step>

<step name="generate_report">
1. Calculate weighted GEO Score per @frameworks/geo-scoring.md formula
2. Identify top 3 quick wins (highest impact / lowest effort)
3. Build full action plan prioritized by estimated point impact
4. Generate report using @templates/geo-report.md format
5. Save to NVC:
   ```
   store_memory(
     key="{project}:geo-audit-{date}",
     namespace="{namespace}",
     content={GEO report},
     tags="geo,audit,{date}",
     title="GEO Audit: {project} {date} — Score: {score}/100"
   )
   ```
6. Present: GEO Score, rating, top 3 quick wins.
</step>

</steps>

<output>
## Artifact
GEO audit report per templates/geo-report.md with score, category breakdown, and action plan.

## NVC Key
`{project}:geo-audit-{date}`

## Presentation
GEO Score + rating + top 3 quick wins presented inline.
</output>

<acceptance-criteria>
- [ ] All 6 scoring categories evaluated with individual scores
- [ ] Weighted GEO Score calculated correctly
- [ ] AI crawler status audited for all Tier 1 crawlers
- [ ] Brand authority checked across all listed platforms
- [ ] Top 3 quick wins identified with impact/effort assessment
- [ ] Report follows templates/geo-report.md format
- [ ] Report saved to NVC with correct key
- [ ] User received score, rating, and actionable quick wins
</acceptance-criteria>
