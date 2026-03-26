<purpose>
Run a pre-deployment readiness checklist that blocks deploy if any CRITICAL item fails. Validates environment, database, build, tests, security, health, and rollback readiness.
</purpose>

<user-story>
As a developer about to deploy, I want an automated pre-flight check that catches deployment blockers, so that I don't push broken code to production.
</user-story>

<when-to-use>
- User runs /nvc:deploy before deploying to production or staging
- As the final step before any deployment
- After all features are implemented and tests pass
- As a gate in the deployment workflow
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@checklists/deploy-ready.md (master checklist to validate against)
@templates/deploy-checklist.md (report format)
</references>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project state
2. Detect deployment target and environment from project config
3. Determine version being deployed (git tag, package.json version, or commit hash)
4. Announce: "Deploy check start. Target: {environment}. Version: {version}."
</step>

<step name="check_environment">
Validate environment configuration. Load @checklists/deploy-ready.md.

1. Check `.env.example` exists and all variables have production values
2. Scan for hardcoded `localhost`, `127.0.0.1`, `0.0.0.0` in production config
3. Verify NODE_ENV / APP_ENV is set to `production`
4. Verify debug mode is disabled
5. Check feature flags are in intended production state

Mark each item PASS or FAIL. Any FAIL is a potential CRITICAL blocker.
</step>

<step name="check_database">
Validate database readiness:

1. Check for pending migrations
2. Verify migration history is clean (no failed migrations)
3. Confirm backup exists and is recent (within 24h if detectable)
4. Verify connection string points to correct environment

Mark each item PASS, FAIL, or N/A (if no database).
</step>

<step name="check_build">
Validate build:

1. Run the build command — must complete without errors
2. Check for critical warnings in output
3. Verify bundle size is within acceptable limits (if defined)
4. Confirm assets are compiled and optimized

Mark each item PASS or FAIL.
</step>

<step name="check_tests">
Validate tests:

1. Run full test suite — must pass with zero failures
2. Check coverage hasn't decreased (if baseline exists)
3. Verify no `.skip` or `.only` in committed test files

Mark each item PASS or FAIL.
</step>

<step name="check_security">
Quick security validation (not full audit — reference /nvc:security for that):

1. Scan for secrets in codebase (API keys, passwords in strings)
2. Run dependency audit for CRITICAL vulnerabilities
3. Verify auth endpoints have rate limiting (if applicable)

Mark each item PASS or FAIL.
</step>

<step name="check_health_rollback">
Validate operational readiness:

**Health:**
1. Health endpoint exists and responds
2. Logging configured for production level
3. Error tracking connected

**Rollback:**
1. Previous version tagged and available
2. Rollback procedure exists
3. Database migrations are reversible (if applicable)

Mark each item PASS, FAIL, or WARN.
</step>

<step name="generate_result">
1. Compile results from all categories
2. Determine overall result:
   - **PASS** — all CRITICAL items pass
   - **FAIL** — any CRITICAL item fails (deploy blocked)
3. Generate report using @templates/deploy-checklist.md
4. If FAIL: list all blockers with exact resolution steps
5. Save to NVC:
   ```
   store_memory(
     key="{project}:deploy-check-{date}",
     namespace="{namespace}",
     content={deploy check report},
     tags="deploy,check,{date}",
     title="Deploy Check: {project} {date} — {result}"
   )
   ```
6. Present result clearly:
   - PASS: "Deploy aprobat. Toate verificările CRITICAL au trecut."
   - FAIL: "Deploy BLOCAT. {N} probleme CRITICAL de rezolvat:" + blocker list
</step>

</steps>

<output>
## Artifact
Deploy readiness report per templates/deploy-checklist.md.

## NVC Key
`{project}:deploy-check-{date}`

## Presentation
Clear PASS/FAIL result with blocker details if FAIL.
</output>

<acceptance-criteria>
- [ ] All 7 categories checked (environment, database, build, tests, security, health, rollback)
- [ ] Each item marked PASS, FAIL, or N/A with explanation
- [ ] CRITICAL failures block the deploy
- [ ] Blockers have specific resolution steps
- [ ] Report follows templates/deploy-checklist.md format
- [ ] Report saved to NVC with correct key
- [ ] User received clear PASS/FAIL with actionable blockers
</acceptance-criteria>
