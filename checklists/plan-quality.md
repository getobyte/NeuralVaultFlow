# Plan Quality Checklist

Validates that a plan is complete and ready to be saved to NVC for execution.

## Structure

- [ ] Plan has a unique `{plan-name}` in kebab-case
- [ ] Plan has status set to `PENDING`
- [ ] Plan has `steps_done` set to `0/{N}`
- [ ] Plan has at least 1 step and no more than 20 steps

## Acceptance Criteria

- [ ] At least 1 AC defined
- [ ] Every AC uses Given/When/Then format per `frameworks/ac-format.md`
- [ ] Every AC is testable (can write a test or manual verification for it)
- [ ] Every AC has a unique ID (AC-1, AC-2, etc.)
- [ ] No AC describes implementation details (only observable behavior)

## Steps

- [ ] Every step has `<description>` — clear, one sentence
- [ ] Every step has `<files>` — specific file paths, not directories
- [ ] Every step has `<action>` — exact modification, not vague ("refactor", "improve", "fix")
- [ ] Every step has `<verify>` — command to run or behavior to check
- [ ] Every step has `<done>` — references at least one AC
- [ ] Steps are ordered logically (dependencies before dependents)

## Boundaries

- [ ] `<boundaries>` section exists with DO NOT TOUCH list
- [ ] Files listed in boundaries are real files in the repo
- [ ] No step modifies files listed in boundaries

## Done Criteria

- [ ] `<done_criteria>` section exists
- [ ] Done criteria references specific ACs that must all be satisfied

## Scoring

| Score | Rating | Action |
|-------|--------|--------|
| 100% | Ready | Save to NVC and start execution |
| 80-99% | Fix | Address gaps before saving |
| Below 80% | Rework | Plan has fundamental gaps — redesign |
