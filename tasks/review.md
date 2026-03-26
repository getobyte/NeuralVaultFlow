<purpose>
Provide an opinionated code review focused on architecture, best practices, readability, and refactoring opportunities. Unlike audit (which finds what's wrong), review suggests what could be better.
</purpose>

<user-story>
As a developer, I want an experienced perspective on my code's architecture and patterns, so that I can improve quality beyond just fixing bugs.
</user-story>

<when-to-use>
- User runs /nvc:review for architecture and quality feedback
- After completing a feature to get a second opinion
- Before a major PR to catch design issues early
- Complements /nvc:audit — audit finds bugs, review finds improvements
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project state
2. Detect stack and framework from repo
3. Determine review scope:
   - Default: recently changed files (git diff)
   - User can specify files, directories, or "full codebase"
4. Announce: "Review start. Stack: {stack}. Scope: {scope}."
</step>

<step name="review_architecture">
Assess architectural decisions:

1. **Separation of concerns** — are responsibilities cleanly divided?
2. **Dependency direction** — do dependencies flow in one direction (UI → service → data)?
3. **Coupling** — are modules tightly or loosely coupled?
4. **Abstraction quality** — are abstractions necessary and at the right level? (no unnecessary abstractions, no missing necessary ones)
5. **Module boundaries** — are public APIs clean? Is internal state properly encapsulated?

Present findings as suggestions, not errors.
</step>

<step name="review_best_practices">
Check framework and stack-specific best practices:

1. **Framework patterns** — is the framework used idiomatically?
2. **State management** — is state handled consistently and appropriately?
3. **API design** — consistent naming, error format, pagination, versioning?
4. **Database patterns** — N+1 queries, missing indexes, query optimization?
5. **Error handling** — consistent strategy, appropriate granularity?

Adapt checks to the detected stack. Don't apply React patterns to a Go backend.
</step>

<step name="review_readability">
Assess code readability:

1. **Naming** — do function and variable names explain what they do?
2. **Comments** — are comments present where logic is non-obvious? Are there outdated comments?
3. **Magic values** — are constants named and documented?
4. **Flow clarity** — can you follow the code path without jumping back and forth?
</step>

<step name="review_refactor_opportunities">
Identify concrete refactoring suggestions:

1. **Duplicated logic** — code that appears in multiple places and could be extracted
2. **Functions doing too much** — functions with multiple responsibilities that could be split
3. **Simplification** — complex code that could be written more simply
4. **Missing patterns** — places where a well-known pattern would improve the code

For each suggestion, explain the benefit and estimate the effort.
</step>

<step name="save_review">
1. Compile findings across all 4 areas
2. Present as suggestions (not errors) with clear benefit for each
3. Prioritize by impact on maintainability
4. Save to NVC:
   ```
   store_memory(
     key="{project}:review-{date}",
     namespace="{namespace}",
     content={review findings},
     tags="review,{date}",
     title="Review: {project} {date}"
   )
   ```
5. Present summary to user: top 5 suggestions with rationale.
</step>

</steps>

<output>
## Artifact
Code review document with suggestions organized by area.

## NVC Key
`{project}:review-{date}`

## Presentation
Top 5 suggestions presented inline. Full review in NVC.
</output>

<acceptance-criteria>
- [ ] All 4 review areas covered (architecture, best practices, readability, refactoring)
- [ ] Findings presented as suggestions, not errors
- [ ] Each suggestion has: location, description, benefit, and estimated effort
- [ ] Suggestions adapted to detected stack (not generic)
- [ ] Review saved to NVC with correct key
- [ ] User received summary with top 5 suggestions
</acceptance-criteria>
