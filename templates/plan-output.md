# Plan Output Template

Template for NVC key `{project}:plan-{plan-name}` — structured execution plans with acceptance criteria and step tracking.

**Purpose:** Consistent plan format that supports step-by-step execution with verify loops and NVC progress tracking.

---

## File Template

```xml
<plan>
  <name>{plan-name}</name>
  <namespace>{namespace}</namespace>
  <status>{status}</status>
  <steps_done>{done-count}/{total-count}</steps_done>
  <created>{date}</created>
  <updated>{date}</updated>

  <acceptance_criteria>
    <ac id="AC-{n}">
      Given [precondition — state of the system before action]
      When  [action — what the user or system does]
      Then  [outcome — observable result that must be true]
    </ac>
  </acceptance_criteria>

  <steps>
    <step id="{n}" status="{status}">
      <description>[What this step accomplishes — one sentence]</description>
      <files>[Comma-separated list of files to create or modify]</files>
      <action>[Exact modification to make — specific enough to execute without ambiguity]</action>
      <verify>[How to verify this step works — command to run or behavior to check]</verify>
      <done>AC-{id} satisfied</done>
      <loops>{iteration-count}</loops>
      <note>[What failed during verify and how it was fixed, if anything]</note>
    </step>
  </steps>

  <boundaries>
    DO NOT TOUCH: [Comma-separated list of files/directories that must not be modified]
  </boundaries>

  <done_criteria>
    [What must be true for the entire plan to be marked DONE — references ACs]
  </done_criteria>

  <loop_report>
    Total steps: {total-count}
    Total loops: {total-loops}
    Steps with loops > 1: [list with what failed and how it was fixed]
    Dead code found and removed: [yes/no]
    All AC satisfied: [yes/no]
  </loop_report>
</plan>
```

---

## Field Documentation

| Field | Type | Required | Purpose | Example |
|-------|------|----------|---------|---------|
| `{plan-name}` | variable | Yes | Kebab-case plan identifier | `user-auth-flow` |
| `{namespace}` | variable | Yes | NVC namespace | `project:my-app` |
| `{status}` | variable | Yes | Plan state | `PENDING`, `IN_PROGRESS`, `DONE`, `BLOCKED` |
| `{done-count}/{total-count}` | variable | Yes | Progress tracker | `3/7` |
| `{date}` | variable | Yes | ISO date | `2026-03-26` |
| `[precondition]` | prose | Yes | System state before action | `user is authenticated` |
| `[action]` | prose | Yes | What triggers the behavior | `accessing GET /api/invoices` |
| `[outcome]` | prose | Yes | Observable result | `receives 200 with paginated list` |
| `[description]` | prose | Yes | Step summary | `Implement JWT token generation` |
| `[files]` | prose | Yes | Files affected by step | `src/auth/jwt.ts, src/middleware/auth.ts` |
| `[action in step]` | prose | Yes | Exact change to make | `Add generateToken() using jsonwebtoken with 24h expiry` |
| `[verify]` | prose | Yes | Verification method | `Run: npm test -- auth.test.ts` |
| `{iteration-count}` | variable | No | Verify loop iterations | `1` (first try pass), `3` (needed 3 attempts) |
| `[note]` | prose | No | Failure/fix notes | `Typecheck failed: missing return type on generateToken` |

## Section Specifications

### acceptance_criteria
**Purpose:** Define the contract BEFORE implementation begins.
**Format:** BDD Given/When/Then per `frameworks/ac-format.md`.
**Quality check:** Every AC must be testable. If you can't write a test for it, rewrite it.

### steps
**Purpose:** Ordered execution units, each with full verify loop support.
**Status values:** `pending`, `in_progress`, `done`, `blocked`
**Quality check:** Every step has all 4 required fields (files, action, verify, done). No step is vague.

### boundaries
**Purpose:** Explicit protection of files that must not be modified.
**Quality check:** At least the boundaries section exists, even if empty with justification.

### loop_report
**Purpose:** Post-execution summary. Only populated when plan reaches DONE status.
**Quality check:** All fields filled, AC satisfaction confirmed.
