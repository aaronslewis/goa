---
name: write-jira-story
description: Use when drafting, reviewing, or creating a Jira story from this prototype, a Figma design, or an observed product behaviour. Produces concise stories in the team's CCPM format (user story panel, portal and user labels, numbered acceptance-criteria to-do list, compact Given/When/Then tables for variations), and separates product acceptance criteria from testing operations such as test data, environment setup, evidence, regression, and release sign-off.
---

# Skill: Write a Jira story

Turn prototype evidence into a Jira story that another product, design,
development, or testing team member can understand and verify without guessing.
The format follows the team's existing stories, for example
[CCPM-3215](https://goa-dio.atlassian.net/browse/CCPM-3215). Remove any section
that would be empty.

The Jira reader is a domain-fluent worker. Write for quick scanning, preserve
precise service vocabulary, and remove background that does not help the team
decide, build, or test the change.

## This prototype's Jira settings

- **Jira project:** `CCPM`
- **Site:** `https://goa-dio.atlassian.net`
- **Portals:** ECDS (internal, blue lozenge) and Child Care Licensing Portal
  (external, purple lozenge)

If there's no Jira project set (the project is `none`, still shows a
placeholder in double underscores, or this section says no project is set yet),
**draft stories only and don't create them in Jira.** Say so when you hand over
the draft, for example: "There's no Jira project set for this prototype yet, so
I've drafted this story for you to paste in."

Connection details, field names and tools are in the `jira-integration` skill.

## Start with evidence

Read the available source before drafting:

- the prototype flow, relevant screens, states, and content
- the Figma frame or node, when provided
- linked Jira issues, decisions, and dependencies
- existing implementation behaviour, when relevant
- notes from research or testing

Treat the prototype as evidence of intended behaviour, not as proof of every
business rule. Do not infer policy, validation, permissions, error handling, or
system behaviour that the source does not establish. Raise unresolved matters
as questions in your hand-over (see "After the story").

Never include real citizen information in a story, screenshot, example, or test
record. Use fictional data or role-based descriptions.

## Decide whether this is a story

Use a **story** when the work delivers observable behaviour or an outcome for a
citizen, worker, or consuming service.

Use a **task** instead when the work is primarily:

- test environment or configuration preparation
- test-data creation
- execution of existing test cases
- evidence collection or defect triage
- regression, smoke testing, or release sign-off
- research, investigation, migration, or internal maintenance with no clear
  user-facing behaviour

If a request combines product behaviour and testing operations, draft a story
for the behaviour and recommend a linked testing task. Do not hide execution
logistics inside the story's acceptance criteria.

## Story structure

Top-level sections are **H1**. Acceptance-criteria groups are **H2**; anything
nested under a group is H3, then H4, only as needed. Sections, in order:

1. **Title** (the issue summary, not a heading in the body)
2. **User story** (H1), with a note panel
3. **Portal and user** line, directly under the panel
4. **Background** (H1)
5. **Design** (H1), its own section holding the design and prototype links
6. **Acceptance criteria** (H1)
7. **Out of scope** (H1), only if there is any
8. **Dev notes** (H1), only if there is any

### Title

Name the capability and affected part of the service. Keep it short and
behaviour-focused. Do not prefix it with `User story` or repeat the epic name
unless the context would otherwise be unclear.

### User story panel

Put the story in a Jira **Note** panel, three lines, with the actor in bold:

```text
As a **[specific actor]**,
I want [capability],
so that [user or service outcome].
```

Use the actor shown by the evidence, such as applicant, parent, case worker,
team lead, administrator, or consuming service. Do not use generic actors such as `User`.
If no meaningful actor or outcome exists, use a task rather than inventing one.

### Portal and user

Always state both, directly under the panel, so they are the first thing a
reader sees:

- **Portal:** a Jira status lozenge, **blue `ECDS`** for the internal portal or
  **purple `Child Care Licensing Portal`** for the external portal. (Jira's
  lozenges have no pink; purple is the agreed stand-in.) If the story spans both
  portals, show both lozenges.
- **User:** the actor, with role or condition (for example, "Super Admin for two
  or more organizations").

When one actor applies to the whole story, name them here once and write "the
user" in the criteria. Name a different actor in a criterion only when it is a
different person.

### Background

Current behaviour, the trigger, and constraints needed to understand the change,
plus the goal if it isn't obvious from the user story. Keep implementation
design out of this section. Link relevant policy or decisions and dependencies
that affect when the behaviour can work. Do not duplicate the acceptance
criteria. The design and prototype links go in the Design section, not here.

### Design

A short H1 section of its own, after Background and before the acceptance
criteria, so the visuals are easy to find. List each link on its own line with a
label that says what it points at:

- **Figma:** the specific frame or node for this story, not the whole file.
- **Prototype:** the preview or snapshot URL, pointing at the relevant screen or
  state.

If the user hasn't given a link to the design or the prototype, ask for one when
you start drafting, and again before creating; never guess a URL. Use whichever
of the two exists. If the user says there is neither, omit the section.

### Acceptance criteria

Write a numbered to-do list the developer can work through and the tester can
cite. Group related criteria under H2 headings, and number each criterion
`AC <group>.<item>`:

```text
1. Choosing an organization            (H2)
AC 1.1 The Declaration step includes an **organization dropdown**.
AC 1.2 Organizations that have signed appear **disabled with a checkmark**.
```

Rules:

- Write each criterion as one sentence saying what must be built or be true,
  with the key term in **bold** so it can be scanned.
- One behaviour or business outcome per criterion.
- Make the result observable to the actor or through a defined system result.
- Use concrete inputs and expected outputs for calculations and rules.
- Keep UI details only when they affect meaning, interaction, accessibility, or
  fidelity to an approved design.
- Avoid vague results such as `works correctly`, `is handled`, or `is valid`.
- Do not express development activities as acceptance criteria.
- Do not write criteria for behaviour the source does not support.
- Keep numbering stable once a story is shared; other stories and tests cite it
  (for example, "CCPM-3213, AC 3.1").
- Always cover the primary successful path. Add only the cases relevant to the
  change: alternate valid paths, empty or unavailable data, permissions and
  roles, boundary values and dates, repeated actions, downstream failure,
  partial success, and content, navigation or accessibility behaviour shown in
  the prototype.
- End with a **Regression** group when existing flows could be affected, saying
  which flows must be unchanged.

#### Given / When / Then for variations

Plain to-do criteria are the default. Use Given / When / Then only when **one
behaviour has several variations** (roles, states, data conditions) or when the
scenario reads best from the user's side. Keep it light:

- **Lead with the point.** Start with a short bold label, then the sentence.
  Put the outcome in bold so it isn't buried at the end.
- **State the shared Given once.** Do not repeat it in every row.
- **Use a table for variations** under one lead-in criterion:

  ```text
  AC 2.3 **Next action depends on how many organizations are outstanding.**
  Given the user has completed an acknowledgement:

  | When | Then |
  |---|---|
  | Organizations are outstanding | Show **Start next acknowledgement** |
  | All are complete | Show **Continue to portal** only |
  ```

  Use `Given | When | Then` columns only if the Given also varies.
- **A single scenario can be one line:**
  `AC 2.4 **Skip the wall.** Given the deadline has not passed, when a Super Admin signs in, then **no wall is shown**.`

### Out of scope

Name meaningful exclusions that prevent the story from expanding during
implementation, as ❌ bullets. Omit the section when there are none.

### Dev notes

Confirmed technical details only: components, routes, services, feature flags,
data sources, integration details, migration considerations, links to prototype
code. Do not put required product behaviour here. **If there are no notes, omit
the whole section, heading included.** Never write "None" or "N/A".

## Links to other stories

Mentioned stories must be officially linked, in two ways:

1. In the text, write the key as an inline smart link, not plain text:
   `<a href="https://goa-dio.atlassian.net/browse/CCPM-3213" data-card-appearance="inline"></a>`.
2. After the story exists, create a Jira issue link to each (`createJiraIssueLink`,
   with a type from `listJiraIssueLinkTypes`; usually *Relates to*, or *Blocks* for
   a real dependency). Confirm the type when the relationship isn't obvious.

## Paste-ready output

In chat, show the draft as markdown so it is easy to review. When creating the
issue, send the description as **HTML** (`contentFormat: "html"`), because
markdown cannot make panels or status lozenges. Shape:

```html
<h1>User story</h1>
<div data-type="panel-note">
  <p><strong>As a [specific actor],</strong></p>
  <p>I want [capability],</p>
  <p>so that [outcome].</p>
</div>
<p><strong>Portal:</strong> <span data-type="status" data-color="purple" data-status-style="bold">Child Care Licensing Portal</span></p>
<p><strong>User:</strong> [actor and condition]</p>

<h1>Background</h1>
<p>[Current behaviour, trigger and constraints.]</p>
<h1>Design</h1>
<ul>
  <li><strong>Figma:</strong> <a href="[Figma URL]">[Frame name]</a></li>
  <li><strong>Prototype:</strong> <a href="[Prototype URL]">[Screen or state]</a></li>
</ul>

<h1>Acceptance criteria</h1>
<h2>1. [Group name]</h2>
<p><strong>AC 1.1</strong> [Criterion with <strong>key term</strong> in bold.]</p>

<h1>Out of scope</h1>
<ul><li>❌ [Exclusion]</li></ul>

<h1>Dev notes</h1>
<ul><li>[Confirmed technical detail]</li></ul>
```

Use `data-color="blue"` and the text `ECDS` for the internal portal. A
Given / When / Then table is a normal `<table>` with `<thead>`/`<tbody>`.
Omit empty sections.

## After the story

Under the story, briefly list assumptions, open questions that block building
or testing (each phrased as a specific question), and any recommended linked
testing task. Do not repeat or explain sections that are already clear.

## Testing task format

When separate testing work is needed, use:

```markdown
# Test [capability or release]

## Purpose and scope

[What is being verified and why. Link the stories in scope.]

## Environment and build

- Environment: [SIT, UAT, production, or other]
- Build or release: [version]
- Configuration: [relevant flags or setup]

## Preconditions and test data

- [Required account, role, record state, or fictional data]

## Scenarios to execute

- [Scenario or linked test case]

## Evidence and results

- Record the result for each scenario.
- Attach evidence without citizen personal information.
- Link defects to the failed scenario.

## Exit criteria

- [Required pass, regression, defect, and sign-off conditions]
```

Do not create a testing task merely to restate the story's acceptance criteria.
Create one when someone must prepare, execute, record, or sign off on testing.

## Readiness check

Before returning or creating the Jira issue, verify:

- The actor is specific and supported by the evidence.
- The portal (lozenge) and the user are stated up front.
- The outcome explains why the capability matters.
- The story describes one coherent behaviour or outcome.
- Every acceptance criterion has an observable result and a bolded key term.
- Relevant alternate or failure cases are covered or raised as questions.
- Variations use a table with the shared Given stated once.
- The Design section has Figma and prototype links that point to the relevant
  screen or state, or the user confirmed there are none.
- Mentioned stories are smart links in the text and linked issues in Jira.
- Requirements, dev notes, and testing operations are separated.
- Empty sections, and placeholder text, have been removed.
- The story contains no invented business rules or real citizen information.

If essential information is missing, ask one focused question at a time.

## Creating it in Jira

Only when the user explicitly asks, and only if a Jira project is set (see
[This prototype's Jira settings](#this-prototypes-jira-settings)). Otherwise
draft only and say so. Connection details and tools are in the
`jira-integration` skill.

**Ask before creating, in one message:**

- **Design and prototype links:** ask for a link to the design (Figma) and to
  the prototype, unless you already have them. Either one is enough.
- **Epic:** offer the open epics (`issuetype = Epic AND project = CCPM AND
  statusCategory != Done`), or none.
- **Fix version:** offer the unreleased versions from `getJiraProjectVersions`,
  or none.
- **Sprint:** offer the active and future sprints on board 174 (from
  `getJiraBoardSprintData`), or none.
- **Story points:** only if the user has an estimate.

Confirm the issue type and parent only if they are not already known. In `CCPM`
the issue types are Story, Task, Bug, Spike and Design Task (plus Xray test
types); use Task for the work listed under "Decide whether this is a story".

Then create it with the paste-ready HTML, the epic as `parent`, `fixVersions`,
and `assignToSprint`. Put the links in the story's Design section, and after
creating, tell the user to paste the Figma link into the issue's **Design**
field, which the connector can't set (see `jira-integration`). **Create it
with the status Proposed**, so nobody picks it up before the team has reviewed
it. If Proposed isn't available in that project, create it in the starting
status and tell the user it still needs to be marked as proposed. Finally,
create the issue links to any mentioned stories and share the new issue's link.
