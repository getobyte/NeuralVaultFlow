<purpose>
Build an executable plan with acceptance criteria, implementation steps, and boundaries. The plan is saved to NVC as the single source of truth for execution.
</purpose>

<user-story>
As a developer, I want a structured plan with clear steps, verification methods, and acceptance criteria, so that I can execute confidently without ambiguity.
</user-story>

<when-to-use>
- Automatically triggered after /nvc:brainstorm completes
- User explicitly runs /nvc:plan
- User has context but no structured plan yet
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@frameworks/ac-format.md (when writing acceptance criteria)
@checklists/plan-quality.md (before saving the plan)
@templates/plan-output.md (for plan structure)
</references>

<steps>

<step name="load_brainstorm" priority="first">
1. Check for existing brainstorm: `retrieve_memory("{project}:brainstorm", namespace)`
2. If brainstorm exists: read it and summarize key requirements
3. If no brainstorm exists: ask user for minimum context:
   - What are you building?
   - What stack?
   - What does done look like?

**Wait for response if no brainstorm found.**
</step>

<step name="define_acceptance_criteria">
Define acceptance criteria BEFORE writing steps. Load @frameworks/ac-format.md.

For each key behavior identified in brainstorm:
1. Write an AC in Given/When/Then format
2. Assign unique ID: AC-1, AC-2, etc.
3. Verify each AC is testable — if you can't describe a test, rewrite it

Present ACs to user for review.

**Wait for user approval of ACs.**
</step>

<step name="identify_boundaries">
Determine what must NOT be modified:

1. Scan repo for critical files (configs, migrations, CI/CD)
2. Ask user: "Există fișiere sau zone care nu trebuie atinse?"
3. Document in boundaries section

**Wait for user confirmation of boundaries.**
</step>

<step name="write_steps">
For each AC, write implementation steps. Load @templates/plan-output.md for structure.

Each step MUST have all 4 required fields:
- `<files>` — specific file paths (not directories)
- `<action>` — exact modification (not "refactor" or "improve")
- `<verify>` — command to run or behavior to check
- `<done>` — which AC(s) this step satisfies

Rules:
- If you cannot specify all 4 fields, the step is too vague — break it down
- Order steps by dependency (foundations first)
- Maximum 20 steps per plan
- Each step references at least one AC
- Each AC is referenced by at least one step
</step>

<step name="quality_gate">
Run the plan through @checklists/plan-quality.md:

- [ ] Every step has: files + action + verify + done
- [ ] AC in Given/When/Then format
- [ ] Every step references at least one AC
- [ ] Boundaries defined
- [ ] Done criteria at plan level
- [ ] No vague steps
- [ ] 1-20 steps
- [ ] Files referenced are real

If any item fails, fix the plan before proceeding.
</step>

<step name="save_plan">
1. Assemble the complete plan using @templates/plan-output.md format
2. Set status to `PENDING`, steps_done to `0/{N}`
3. Save to NVC:
   ```
   store_memory(
     key="{project}:plan-{plan-name}",
     namespace="{namespace}",
     content={complete plan XML},
     tags="plan,active,{plan-name}",
     title="Plan: {plan-name}"
   )
   ```
4. Report: "Plan salvat: {N} steps, {M} AC. Rulează `/nvc:execute` să începi."
</step>

</steps>

<output>
## Artifact
Complete execution plan in XML format per templates/plan-output.md.

## NVC Key
`{project}:plan-{plan-name}`

## Follow-up
User runs /nvc:execute to begin implementation.
</output>

<acceptance-criteria>
- [ ] All ACs defined in Given/When/Then format before steps
- [ ] Every step has files, action, verify, and done fields
- [ ] Boundaries explicitly defined
- [ ] Plan passes checklists/plan-quality.md validation
- [ ] Plan saved to NVC with correct key and tags
- [ ] User confirmed plan matches their intent
</acceptance-criteria>
