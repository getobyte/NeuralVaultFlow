<purpose>
Guide structured requirements gathering by detecting project type and asking targeted questions. Produces a complete brainstorm document saved to NVC, then automatically triggers /nvc:plan.
</purpose>

<user-story>
As a developer starting a new project or feature, I want a structured brainstorm session tailored to my project type, so that I capture all necessary context before jumping into planning.
</user-story>

<when-to-use>
- User starts a new project or feature with /nvc:brainstorm
- User has an idea but hasn't structured requirements yet
- Entry point routes here when user needs to define scope before planning
</when-to-use>

<context>
@frameworks/nvc-tools.md
</context>

<steps>

<step name="load_context" priority="first">
1. Detect git root and set namespace: `project:{repo-name}`
2. Run `get_context(namespace, limit=10, keys_only=True)` to check for existing project state
3. If a brainstorm already exists for this project, retrieve it and ask: "Brainstorm existent găsit. Vrei să-l actualizezi sau să începi unul nou?"

**Wait for response if existing brainstorm found.**
</step>

<step name="detect_project_type">
Analyze the repo structure, existing files, and user input to identify project type:

| Type | Indicators |
|------|------------|
| `app` | Has UI components, data models, API routes, deployment config |
| `workflow` | Scripts, automation, Claude commands, pipelines |
| `client` | Website for a business/client, marketing focus, CMS |
| `utility` | Small tool, single-purpose, CLI or library |
| `campaign` | Content, marketing materials, launch assets |

If ambiguous, ask: "Ce tip de proiect e ăsta?" and present the options.

**Wait for confirmation of project type.**
</step>

<step name="gather_requirements">
Based on detected project type, ask targeted questions. Maximum 2-3 questions at a time.

<if condition="type is app">
Round 1:
1. Ce problemă rezolvă aplicația? Cine sunt userii?
2. Auth necesar? Ce tip (email/pass, OAuth, magic link)?

Round 2:
3. Data model aproximativ — ce entități principale?
4. Stack preferat sau detectat din repo?

Round 3:
5. Deployment target (Vercel, AWS, self-hosted)?
6. Integrări externe (payment, email, analytics)?
</if>

<if condition="type is workflow">
Round 1:
1. Ce trigger pornește workflow-ul?
2. Ce input primește și de unde?

Round 2:
3. Ce output produce și unde se salvează?
4. Ce tool-uri/API-uri are acces?
</if>

<if condition="type is client">
Round 1:
1. Ce tip de business? Cine e audiența?
2. Goal principal — leads, vânzări, awareness?

Round 2:
3. CMS necesar? Dacă da, care?
4. Există brand guidelines (culori, fonturi, ton)?
</if>

<if condition="type is utility">
Round 1:
1. Ce input primește exact?
2. Ce output produce exact?

Round 2:
3. Edge cases de care știi?
4. Unde rulează — CLI, server, browser?
</if>

<if condition="type is campaign">
Round 1:
1. Obiectiv măsurabil (ex: 100 signups, 50 leads)?
2. Timeline — când trebuie gata?

Round 2:
3. Canale — email, social, paid, organic?
4. Mesaj central / USP?
</if>

Act as a coach, not an interrogator. Offer suggestions when the user is stuck. Ask follow-up questions based on answers.

**Wait for response after each round.**
</step>

<step name="quality_gate">
Before proceeding to plan, verify all required elements are captured:

- [ ] Scope definit — ce se construiește exact
- [ ] Stack cunoscut sau detectat din repo
- [ ] Done criteria — cum arată success
- [ ] Constraints — ce nu se face, ce nu se schimbă
- [ ] Cel puțin 1 acceptance criteria identificat

If any item is missing, ask targeted questions to fill the gap. Do not proceed to plan with gaps.

**Wait for any missing information.**
</step>

<step name="save_and_transition">
1. Structure all gathered information into a clean document:
   - Project type
   - Problem/goal
   - Stack
   - Requirements (grouped by topic)
   - Done criteria
   - Constraints
   - Initial acceptance criteria

2. Save to NVC:
   ```
   store_memory(
     key="{project}:brainstorm",
     namespace="{namespace}",
     content={structured brainstorm document},
     tags="brainstorm,{project-type}",
     title="Brainstorm: {project-name}"
   )
   ```

3. Announce: "Brainstorm complet. Pornesc planul."

4. Automatically load and execute `tasks/plan.md`.
</step>

</steps>

<output>
## Artifact
Structured brainstorm document stored in NVC.

## NVC Key
`{project}:brainstorm`

## Side Effect
Automatically triggers /nvc:plan after successful save.
</output>

<acceptance-criteria>
- [ ] Project type correctly identified
- [ ] All quality gate items satisfied (scope, stack, done criteria, constraints, at least 1 AC)
- [ ] Brainstorm saved to NVC with correct key and namespace
- [ ] Plan task triggered automatically after save
- [ ] User confirmed the brainstorm captures their intent
</acceptance-criteria>
