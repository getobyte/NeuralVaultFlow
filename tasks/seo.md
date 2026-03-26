<purpose>
Perform a complete technical SEO audit covering meta tags, HTML structure, technical requirements, Core Web Vitals, structured data, and indexability. Produces a prioritized report with concrete fixes.
</purpose>

<user-story>
As a developer or site owner, I want a technical SEO audit that finds real issues and tells me exactly how to fix them, so that my site ranks better in search engines.
</user-story>

<when-to-use>
- User runs /nvc:seo for a technical SEO audit
- Before launching a website
- After a major redesign or migration
- When organic traffic has dropped unexpectedly
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@frameworks/json-ld-schemas.md (when checking and recommending structured data)
</references>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project
2. Identify site type (SaaS, e-commerce, blog, portfolio, etc.)
3. Determine audit scope (full site or specific pages)
4. Announce: "SEO audit start. Site type: {type}. Scope: {scope}."
</step>

<step name="audit_meta_html">
Check meta tags and HTML structure:

1. **Title tag** — present, unique per page, 50-60 characters
2. **Meta description** — present, 150-160 characters, compelling
3. **Open Graph tags** — og:title, og:description, og:image, og:url complete
4. **Twitter Card tags** — twitter:card, twitter:title, twitter:description
5. **Canonical URL** — set correctly, no self-referencing loops
6. **H1 tag** — exactly one per page, descriptive
7. **Heading hierarchy** — proper h1→h2→h3 flow, no skipped levels
8. **Image alt text** — present on all images, descriptive
9. **Language tag** — `lang` attribute on `<html>` element
</step>

<step name="audit_technical">
Check technical SEO requirements:

1. **Sitemap.xml** — exists, valid XML, includes all important pages
2. **robots.txt** — exists, correctly configured, not blocking important pages
3. **HTTPS** — enforced, no mixed content
4. **Redirects** — 301 for permanent, 302 only for temporary
5. **404 page** — custom page exists, returns correct status code
6. **URL structure** — clean, descriptive, no unnecessary parameters
7. **Pagination** — rel=prev/next or canonical correctly set
8. **Mobile responsiveness** — viewport meta tag, responsive design
9. **Hreflang** — present if multilingual site
</step>

<step name="audit_performance_seo">
Check Core Web Vitals and performance SEO:

1. **LCP (Largest Contentful Paint)** — target < 2.5s
2. **INP (Interaction to Next Paint)** — target < 200ms
3. **CLS (Cumulative Layout Shift)** — target < 0.1
4. **TTFB (Time to First Byte)** — target < 800ms
5. **Render-blocking resources** — CSS/JS blocking first paint
6. **Image optimization** — WebP/AVIF format, correct sizing, srcset
7. **Font loading** — font-display: swap or optional
</step>

<step name="audit_structured_data">
Check structured data quality. Load @frameworks/json-ld-schemas.md.

1. **Schema.org present** — relevant schema types implemented
2. **Schema validation** — no errors in structured data
3. **Completeness** — required and recommended fields populated
4. **Relevance** — schema type matches page content

Recommend missing schemas based on site type:
- Organization/LocalBusiness for company sites
- Article + Person for blogs/content sites
- Product for e-commerce
- SoftwareApplication for SaaS
- WebSite + SearchAction for all sites
</step>

<step name="audit_indexability">
Check indexability:

1. **Important pages not blocked** — key pages accessible to crawlers
2. **noindex usage** — correctly applied only where intended
3. **Internal linking** — important pages have sufficient internal links
4. **Orphan pages** — pages with no internal links pointing to them
5. **Crawl depth** — important pages reachable within 3 clicks from homepage
</step>

<step name="generate_report">
1. Compile all findings
2. Assign severity: CRITICAL / HIGH / MEDIUM / LOW
3. For each finding: location, description, impact, concrete fix
4. Save to NVC:
   ```
   store_memory(
     key="{project}:seo-audit-{date}",
     namespace="{namespace}",
     content={SEO audit report},
     tags="seo,audit,{date}",
     title="SEO Audit: {project} {date}"
   )
   ```
5. Present summary: severity counts + top 5 fixes with highest impact.
</step>

</steps>

<output>
## Artifact
SEO audit report with prioritized findings and fixes.

## NVC Key
`{project}:seo-audit-{date}`

## Presentation
Severity summary + top 5 high-impact fixes presented inline.
</output>

<acceptance-criteria>
- [ ] All 5 audit areas covered (meta/HTML, technical, performance, structured data, indexability)
- [ ] Every finding has location, description, and concrete fix
- [ ] Findings prioritized by severity
- [ ] Structured data recommendations reference frameworks/json-ld-schemas.md templates
- [ ] Report saved to NVC with correct key
- [ ] User received summary with top 5 actionable fixes
</acceptance-criteria>
