<purpose>
Execute a saved plan step by step with mandatory verify loops on each step. Track progress in NVC. The most complex task in the skill — it implements code, runs verifications, and manages state.
</purpose>

<user-story>
As a developer, I want my plan executed methodically with automatic verification on every step, so that I catch issues immediately instead of discovering them at the end.
</user-story>

<when-to-use>
- User runs /nvc:execute after a plan has been created
- User wants to resume execution of a partially completed plan
- Entry point routes here when a plan exists and user wants to build
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<references>
@frameworks/verify-loop.md (during every step verification)
@frameworks/ac-format.md (when checking AC satisfaction)
@checklists/execute-done.md (before marking any step as done)
</references>

<steps>

<step name="load_plan" priority="first">
1. Run `get_context(namespace, limit=5, keys_only=True)` to see what exists
2. Run `search_memories("plan", namespace, keys_only=True)` to find active plans
3. If multiple plans found, present list and ask user to choose
4. If no plan found: "Nu există plan activ. Rulează `/nvc:plan` întâi."
5. Retrieve the full plan: `retrieve_memory("{project}:plan-{name}", namespace, view="full")`
6. Identify the first step with `status="pending"`
7. If all steps are done, jump to `generate_report` step

**Wait for user choice if multiple plans found.**
</step>

<step name="announce_step">
For the current pending step:

1. Display: "Step {id}/{total}: {description}"
2. Show the files to be modified
3. Show the action to be taken
4. Show the verify method
5. Show which AC this step satisfies

Proceed immediately to implementation — no wait needed unless user intervenes.
</step>

<step name="implement">
Execute the action defined in the current step:

1. Write the code as specified in `<action>`
2. Respect boundaries from the plan — do NOT touch files in DO NOT TOUCH list
3. Only modify files listed in the step's `<files>` field
4. If the action is unclear during implementation, ask user for clarification

**Wait for user response only if clarification is needed.**
</step>

<step name="verify_loop">
Run the mandatory verify loop per @frameworks/verify-loop.md:

```
iteration = 1

loop:
  1. Run build (if applicable)
  2. Run typecheck (if applicable)
  3. Run lint on modified files
  4. Run tests relevant to this step
  5. Dead code check on modified files

  if ANY FAIL:
    - Identify exact failure
    - Fix immediately within this step's scope
    - iteration++
    - repeat

  if ALL PASS:
    - break

  if SAME FAILURE 5 TIMES:
    - Mark step BLOCKED
    - Save to NVC: status="blocked", reason="[exact description]"
    - Report to user
    - STOP — do not continue to next step
```
</step>

<step name="record_and_advance">
After verify loop passes, validate against @checklists/execute-done.md:

1. Update the plan in NVC:
   ```
   step {id}: status="done", loops={iteration}, note={failure notes if any}
   steps_done: {done+1}/{total}
   status: "IN_PROGRESS" (or "DONE" if last step)
   ```
2. Save updated plan:
   ```
   store_memory("{project}:plan-{name}", namespace, content={updated plan})
   ```
3. Report: "Step {id} done. Loops: {iteration}. [note if failures occurred]"
4. Display: "Urmează step {id+1}: {description}"
5. Proceed to next pending step — return to `announce_step`

If this was the last step, proceed to `generate_report`.
</step>

<step name="generate_report" priority="last">
When all steps are done, generate the loop report:

```
Plan: {name}
Total steps: {N}
Total loops: {sum of all iterations}
Steps with loops > 1: [list with what failed and how it was fixed]
Dead code found & removed: yes/no
All AC satisfied: yes/no
```

Update NVC with final state:
```
store_memory("{project}:plan-{name}", status="DONE", loop_report={report})
store_memory("{project}:progress", content={add plan to done list, update current state})
```

Present the complete loop report to the user.
</step>

</steps>

<output>
## Artifact
Implemented code with all steps verified, plus a loop report summarizing execution.

## NVC Keys Updated
- `{project}:plan-{name}` — status=DONE with loop_report
- `{project}:progress` — updated project state

## Report
Loop report presented to user at completion.
</output>

<acceptance-criteria>
- [ ] Plan loaded from NVC successfully
- [ ] Each step implemented as specified in plan
- [ ] Verify loop ran on every step (no steps skipped)
- [ ] Blocked steps reported to user with exact reason (if any)
- [ ] NVC updated after every step completion
- [ ] Loop report generated when all steps are done
- [ ] All plan ACs satisfied at completion
</acceptance-criteria>
