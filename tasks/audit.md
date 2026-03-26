<purpose>
Perform a complete static analysis of the codebase covering dead code, errors, consistency, security basics, and code quality. Produces a prioritized report saved to NVC.
</purpose>

<user-story>
As a developer, I want an objective audit of my codebase that finds real issues and prioritizes them, so that I can fix the most impactful problems first.
</user-story>

<when-to-use>
- User runs /nvc:audit for a codebase health check
- Before major refactoring to understand current state
- After a sprint to catch accumulated technical debt
- As part of a pre-release quality gate
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@templates/audit-report.md (when generating the report)
</references>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project state
2. Detect stack from repo (package.json, requirements.txt, Cargo.toml, etc.)
3. Determine audit scope:
   - Default: full codebase
   - If user specified a directory or file set, limit to that scope
4. Announce: "Audit start. Stack: {stack}. Scope: {scope}."
</step>

<step name="audit_dead_code">
Scan for dead code:

1. **Unused imports** — imported but never referenced
2. **Unused functions/variables** — declared but never called/used
3. **Unreferenced components** — UI components not mounted anywhere
4. **Unimported files** — files that exist but are never imported
5. **Dead feature flags** — flags set to false with code blocks never executed

For each finding, record: file path, line number, what's dead, confidence level.
</step>

<step name="audit_errors">
Scan for potential errors and bugs:

1. **Null/undefined access** — accessing properties without null checks
2. **Async without error handling** — await/promise without try/catch or .catch()
3. **Type mismatches** — passing wrong types to functions (if detectable)
4. **Race conditions** — shared state modified by concurrent operations
5. **Memory leaks** — event listeners never removed, timers never cleared, subscriptions never unsubscribed

For each finding, record: file path, line number, description, potential impact.
</step>

<step name="audit_consistency">
Check codebase consistency:

1. **Naming conventions** — are functions, variables, files named consistently?
2. **Pattern consistency** — is the same pattern used for similar operations?
3. **Import organization** — consistent import ordering across files?
4. **Error handling** — same error handling approach throughout?

Flag inconsistencies, not style preferences. Focus on patterns that could cause confusion.
</step>

<step name="audit_security_basics">
Quick security scan (reference tasks/security.md for full audit):

1. **Hardcoded secrets** — API keys, passwords, tokens in source code
2. **Unvalidated input** — user input used without validation at entry points
3. **SQL/NoSQL injection** — string concatenation in queries
4. **XSS** — unescaped user content in rendered output

Only flag clear issues, not theoretical concerns.
</step>

<step name="audit_code_quality">
Assess code quality signals:

1. **Long functions** — functions over 50 lines (flag, not absolute rule)
2. **High complexity** — deeply nested conditionals, many branches
3. **Logic duplication** — same logic repeated in multiple places
4. **Magic values** — numbers/strings used without context or constants

Record with context — explain why it matters, not just that it exists.
</step>

<step name="generate_report">
1. Compile all findings
2. Assign severity to each:
   - **CRITICAL** — security issues, data loss risk, crashes
   - **HIGH** — bugs likely to manifest, significant dead code
   - **MEDIUM** — consistency issues, code quality concerns
   - **LOW** — minor dead code, style inconsistencies

3. Generate report using @templates/audit-report.md format
4. Save to NVC:
   ```
   store_memory(
     key="{project}:audit-{date}",
     namespace="{namespace}",
     content={audit report},
     tags="audit,{date}",
     title="Audit: {project} {date}"
   )
   ```
5. Present report to user with summary and top 3 recommendations.
</step>

</steps>

<output>
## Artifact
Audit report in markdown format per templates/audit-report.md.

## NVC Key
`{project}:audit-{date}`

## Presentation
Summary table + top 3 recommendations presented inline. Full report in NVC.
</output>

<acceptance-criteria>
- [ ] All 5 audit categories analyzed (dead code, errors, consistency, security, quality)
- [ ] Every finding has: location, description, severity, and fix
- [ ] Findings prioritized as CRITICAL/HIGH/MEDIUM/LOW
- [ ] Report follows templates/audit-report.md format
- [ ] Report saved to NVC with correct key
- [ ] Summary with top 3 recommendations presented to user
</acceptance-criteria>
