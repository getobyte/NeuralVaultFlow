<purpose>
Perform a comprehensive security audit based on OWASP top 10, covering input validation, authentication, data exposure, headers, and dependencies. Produces a prioritized report with exploit scenarios for critical findings.
</purpose>

<user-story>
As a developer, I want a security audit that finds real vulnerabilities and explains their impact with exploit scenarios, so that I can fix the most dangerous issues before they're exploited.
</user-story>

<when-to-use>
- User runs /nvc:security for a security audit
- Before deploying to production
- After adding authentication, payment, or user data features
- As part of compliance requirements
- When /nvc:audit flags security basics that need deeper investigation
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<steps>

<step name="load_context" priority="first">
1. Run `get_context(namespace, limit=10, keys_only=True)` to understand project
2. Detect stack, framework, and database from repo
3. Identify security-relevant areas: auth, user input, file operations, external APIs, database queries
4. Announce: "Security audit start. Stack: {stack}. Focus areas: {areas}."
</step>

<step name="audit_input_validation">
Check all points where external input enters the system:

1. **SQL injection** — queries built with string concatenation instead of parameterized queries
2. **NoSQL injection** — MongoDB operator injection via unvalidated objects
3. **XSS** — user content rendered without output encoding, missing CSP headers
4. **Path traversal** — file operations using user input without sanitization
5. **Command injection** — exec/spawn/system calls with user-provided arguments
6. **SSRF** — server-side requests to user-provided URLs without validation

For each: file, line, description, exploit scenario.
</step>

<step name="audit_auth">
Check authentication and authorization:

1. **Password hashing** — must use bcrypt/argon2/scrypt (not MD5/SHA1/SHA256 without salt)
2. **JWT security** — algorithm specified (not `none`), secret strength, expiry set, refresh token rotation
3. **Session management** — cookies with secure, httpOnly, sameSite attributes
4. **Rate limiting** — auth endpoints (login, register, reset) have rate limits
5. **IDOR** — resource access checks ownership (not just authentication)
6. **Privilege escalation** — can a regular user access admin endpoints by changing request?

For each: file, description, severity, exploit scenario for CRITICAL/HIGH.
</step>

<step name="audit_data_exposure">
Check for sensitive data exposure:

1. **Hardcoded secrets** — API keys, passwords, tokens in source code or committed to git
2. **Environment files** — `.env` in `.gitignore`? `.env.example` has real values?
3. **Error messages** — production errors expose stack traces or internal details?
4. **API responses** — endpoints return sensitive fields (passwords, tokens, internal IDs)?
5. **Logging** — sensitive data (passwords, tokens, PII) written to logs?

For each: file, what's exposed, impact, fix.
</step>

<step name="audit_headers_transport">
Check security headers and transport:

1. **HSTS** — Strict-Transport-Security header present with reasonable max-age
2. **CSP** — Content-Security-Policy header set and not overly permissive
3. **X-Frame-Options** — DENY or SAMEORIGIN to prevent clickjacking
4. **X-Content-Type-Options** — nosniff to prevent MIME-type sniffing
5. **Referrer-Policy** — set to limit referrer information leakage
6. **Permissions-Policy** — restrict browser features (camera, microphone, geolocation)
</step>

<step name="audit_dependencies">
Check dependency security:

1. **Known vulnerabilities** — run `npm audit` / `pip audit` / equivalent
2. **Critical vulnerabilities** — any CRITICAL or HIGH severity?
3. **Abandoned packages** — dependencies not updated in 2+ years
4. **Excessive dependencies** — unnecessary packages that increase attack surface

For each vulnerable dependency: package name, vulnerability, severity, fix (update or replace).
</step>

<step name="generate_report">
1. Compile all findings
2. Assign severity:
   - **CRITICAL** — exploitable now, fix immediately (e.g., SQL injection, hardcoded credentials)
   - **HIGH** — exploitable with some effort, fix in current sprint
   - **MEDIUM** — defense-in-depth issue, plan to fix
   - **LOW** — informational, best practice
3. Write exploit scenarios for all CRITICAL and HIGH findings
4. Save to NVC:
   ```
   store_memory(
     key="{project}:security-audit-{date}",
     namespace="{namespace}",
     content={security report},
     tags="security,audit,{date}",
     title="Security Audit: {project} {date}"
   )
   ```
5. Present: severity summary + all CRITICAL findings with exploit scenarios + fix instructions.
</step>

</steps>

<output>
## Artifact
Security audit report with exploit scenarios and prioritized fixes.

## NVC Key
`{project}:security-audit-{date}`

## Presentation
All CRITICAL findings presented immediately. HIGH findings summarized. Full report in NVC.
</output>

<acceptance-criteria>
- [ ] All 5 security areas audited (input validation, auth, data exposure, headers, dependencies)
- [ ] Every finding has: location, description, severity, and fix
- [ ] CRITICAL and HIGH findings include exploit scenarios
- [ ] No false positives presented as CRITICAL (confidence must be high)
- [ ] Report saved to NVC with correct key
- [ ] All CRITICAL findings presented to user immediately
</acceptance-criteria>
