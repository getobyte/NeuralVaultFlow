# Execute Done Checklist

Validates that an implementation step is complete and can be marked as DONE.

## Code

- [ ] Code for this step is written and saved
- [ ] Code respects the plan's boundaries (DO NOT TOUCH files untouched)
- [ ] No placeholder or TODO comments left in new code

## Verify Loop

- [ ] Build passes without errors (if applicable for stack)
- [ ] Typecheck passes without errors (if applicable for stack)
- [ ] Lint passes on all files modified in this step
- [ ] Tests relevant to this step pass
- [ ] No dead code introduced by this step (unused imports, functions, variables)

## NVC Tracking

- [ ] Plan updated in NVC with step status set to `done`
- [ ] Loop count recorded (number of verify iterations)
- [ ] Notes recorded if any check failed and was fixed

## Acceptance Criteria

- [ ] At least one AC referenced by this step is satisfied
- [ ] Verification method from the step's `<verify>` field executed and passed

## Scoring

| Score | Rating | Action |
|-------|--------|--------|
| 100% | Done | Step complete, proceed to next |
| 75-99% | Almost | Fix remaining items, do not proceed |
| Below 75% | Incomplete | Step is not done — continue working |
