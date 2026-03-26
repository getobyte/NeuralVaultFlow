<verify_loop>

## Purpose

Canonical definition of the verify loop — the mandatory validation cycle that runs after every implementation step in `tasks/execute.md`. A step is not DONE until the verify loop passes.

## The Loop

```
VERIFY LOOP

Input:  one implemented step
Output: PASS or FAIL + iteration count

iteration = 1

loop:
  1. Run BUILD (if applicable for stack)
     - npm run build, cargo build, go build, etc.
     - Skip if stack has no build step (scripts, configs)

  2. Run TYPECHECK (if applicable)
     - tsc --noEmit, mypy, etc.
     - Skip if dynamically typed with no checker configured

  3. Run LINT on modified files only
     - eslint, ruff, clippy, etc.
     - Only files touched in this step — not the entire codebase

  4. Run TESTS relevant to this step
     - Tests directly related to what changed
     - Not the full suite — targeted tests only
     - If no tests exist for this change, note it but don't block

  5. DEAD CODE CHECK on modified files
     - Unused imports, unreferenced functions, orphan variables
     - Introduced by THIS step only — don't flag pre-existing dead code

  if ANY of 1-5 FAIL:
    - Identify exactly what failed and why
    - Fix within the scope of the current step
    - Do NOT move to the next step
    - iteration++
    - repeat loop

  if ALL PASS:
    - break
```

## Escalation: When to Stop

There is no hard iteration limit. However:

If the **same check fails 5 times** with the same root cause:
1. Mark the step as `BLOCKED`
2. Record in NVC: `status="blocked"`, `reason="[exact description]"`
3. Report to user with full context
4. Do NOT continue to the next step
5. Do NOT attempt workarounds that bypass the check

## What Each Check Validates

| Check | Validates | Common Failures |
|-------|-----------|-----------------|
| Build | Code compiles/bundles without errors | Missing imports, syntax errors, type mismatches |
| Typecheck | Type safety across boundaries | Wrong parameter types, missing return types, nullable access |
| Lint | Code style and common mistakes | Unused variables, missing semicolons, formatting |
| Tests | Behavior correctness | Broken assertions, missing edge cases, stale snapshots |
| Dead code | No waste introduced | Unused imports from copy-paste, orphan helper functions |

## Report Format Per Step

After the loop completes (PASS or BLOCKED):

```
Step {id} verify report:
  status:        PASS | BLOCKED
  loops:         {iteration count}
  failed_checks: [list of what failed at each iteration]
  fixes_applied: [what changed to make it pass]
  dead_code:     found & removed: yes/no
```

This report is stored in NVC as part of the plan update.

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Correct Approach |
|-------------|-------------|-----------------|
| Running full test suite every iteration | Slow, wastes time on unrelated tests | Run only tests relevant to the current step |
| Skipping verify "because it's a small change" | Small changes cause big breaks | Every step gets verified, no exceptions |
| Fixing lint by disabling rules | Hides problems instead of fixing them | Fix the actual code, not the linter config |
| Moving to next step with failing tests | Cascading failures, harder to debug later | Fix current step completely before proceeding |
| Flagging pre-existing dead code | Scope creep — this step didn't cause it | Only check dead code introduced by this step |

</verify_loop>
