<purpose>
Perform an end-to-end performance audit covering frontend, backend, and infrastructure. Identifies bottlenecks and provides concrete optimization recommendations prioritized by impact.
</purpose>

<user-story>
As a developer, I want to know where my application is slow and what to fix first, so that I can improve user experience with targeted optimizations.
</user-story>

<when-to-use>
- User runs /nvc:perf for performance analysis
- When application feels slow or users report latency
- Before scaling — optimize before throwing hardware at the problem
- After adding new features that may have introduced regressions
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project
2. Detect stack and identify which layers exist (frontend, backend, database, infra)
3. Determine audit scope based on stack:
   - Frontend-only: SPA, static sites
   - Full-stack: apps with frontend + backend
   - Backend-only: APIs, services
4. Announce: "Performance audit start. Stack: {stack}. Layers: {layers}."
</step>

<step name="audit_frontend">
Skip if no frontend layer detected.

1. **Bundle size** — analyze total size, identify largest modules, code-split opportunities
2. **Lazy loading** — are images, components, and routes lazy-loaded where appropriate?
3. **Render-blocking resources** — CSS/JS in `<head>` that block first paint
4. **Font loading** — is `font-display: swap` or `optional` used?
5. **Image optimization** — WebP/AVIF formats, correct dimensions, srcset for responsive
6. **Caching strategy** — Cache-Control headers set correctly for static assets?
7. **Third-party scripts** — external scripts loaded async? Impact measured?

For each finding: what's slow, how much impact, how to fix.
</step>

<step name="audit_backend">
Skip if no backend layer detected.

1. **Response time** — identify slow endpoints from code patterns (heavy computation, multiple awaits)
2. **N+1 queries** — loops with database queries inside
3. **Missing indexes** — fields used in WHERE/JOIN/ORDER BY without index
4. **Query complexity** — unnecessary JOINs, SELECT * where specific fields would suffice
5. **Pagination** — correctly implemented (cursor or offset) vs loading everything
6. **Caching** — data that should be cached but isn't (session data, config, frequently accessed records)
7. **Connection management** — database connection pooling configured?

For each finding: endpoint/file, impact, fix.
</step>

<step name="audit_infrastructure">
Check infrastructure-level performance:

1. **CDN** — static assets served through CDN?
2. **Compression** — Gzip/Brotli enabled for responses?
3. **HTTP version** — HTTP/2 or HTTP/3 support?
4. **Connection pooling** — database connections pooled?
5. **Process management** — PM2/cluster mode for Node.js? Worker processes for Python?
6. **Memory** — signs of memory leaks (growing RSS, frequent restarts)?

For each finding: current state, recommendation, expected impact.
</step>

<step name="generate_report">
1. Compile all findings across layers
2. Prioritize by estimated impact:
   - **HIGH** — likely to cause noticeable user-facing improvement
   - **MEDIUM** — will improve performance but less visible
   - **LOW** — marginal improvement, nice to have

3. For each finding include:
   - Location (file, endpoint, or config)
   - Current state
   - Recommended fix (specific, not "optimize this")
   - Expected impact

4. Save to NVC:
   ```
   store_memory(
     key="{project}:perf-audit-{date}",
     namespace="{namespace}",
     content={performance report},
     tags="performance,audit,{date}",
     title="Perf Audit: {project} {date}"
   )
   ```
5. Present: top 5 highest-impact optimizations with implementation guidance.
</step>

</steps>

<output>
## Artifact
Performance audit report with prioritized optimizations.

## NVC Key
`{project}:perf-audit-{date}`

## Presentation
Top 5 optimizations presented inline with expected impact.
</output>

<acceptance-criteria>
- [ ] All applicable layers audited (frontend, backend, infrastructure)
- [ ] Layers correctly detected from stack — irrelevant layers skipped
- [ ] Every finding has: location, current state, fix, and estimated impact
- [ ] Findings prioritized by user-facing impact (HIGH/MEDIUM/LOW)
- [ ] Report saved to NVC with correct key
- [ ] User received top 5 actionable optimizations
</acceptance-criteria>
