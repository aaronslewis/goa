---
name: write-jira-story
description: Use when drafting, reviewing, or creating a Jira story from this prototype, a Figma design, or an observed product behaviour. Produces concise, test-ready stories using the team's story format, and separates product acceptance criteria from testing operations such as test data, environment setup, evidence, regression, and release sign-off.
---

# Skill: Write a Jira story

Turn prototype evidence into a Jira story that another product, design,
development, or testing team member can understand and verify without guessing.
Use the team's Jira story template (below) as a starting point, not as a set of
headings that must remain when they are empty.

The Jira reader is a domain-fluent worker. Write for quick scanning, preserve
precise service vocabulary, and remove background that does not help the team
decide, build, or test the change.

## This prototype's Jira settings

- **Jira project:** `CCPM`
- **Story template:** `none`

If the story template is `none`, use the paste-ready format in this skill.

If there's no Jira project set (the project is `none`, still shows a
placeholder in double underscores, or this section says no project is set yet),
**draft stories only and don't create them in Jira.** Say so when you hand over
the draft, for example: "There's no Jira project set for this prototype yet, so
I've drafted this story for you to paste in."

## Start with evidence

Read the available source before drafting:

- the prototype flow, relevant screens, states, and content
- the Figma frame or node, when provided
- linked Jira issues, decisions, and dependencies
- existing implementation behaviour, when relevant
- notes from research or testing

Treat the prototype as evidence of intended behaviour, not as proof of every
business rule. Do not infer policy, validation, permissions, error handling, or
system behaviour that the source does not establish. Put unresolved matters in
`Decisions needed`.

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

## Draft the story

### Title

Name the capability and affected part of the service. Keep it short and
behaviour-focused. Do not prefix it with `User story` or repeat the epic name
unless the context would otherwise be unclear.

### User story

Use:

```text
As a [specific actor]
I want [capability]
So that [user or service outcome]
```

Use the actor shown by the evidence, such as applicant, parent, case worker,
team lead, administrator, or consuming service. Do not use generic actors such as `User`.
If no meaningful actor or outcome exists, use a task rather than inventing one.

### Context

Include only the current behaviour, trigger, and constraints needed to
understand the change. Keep implementation design out of this section.

### Desired state

State the goal and link the source of truth when available:

- prototype, preview, or snapshot URL
- Figma file and specific frame or node
- relevant policy, decision, or related Jira issue
- dependency that affects when the behaviour can work

Do not duplicate the acceptance criteria here.

### Acceptance criteria

Write named scenarios using Given, When, Then:

```text
Scenario: [short behaviour-focused name]

Given [starting state and relevant data]
And [additional precondition, if needed]
When [one action or event]
Then [observable result]
And [secondary observable result, if needed]
```

Apply these rules:

- Write one behaviour or business outcome per scenario.
- Use `Given` for state, not actions or implementation steps.
- Use one primary trigger in `When`.
- Make `Then` observable to the actor or through a defined system result.
- Use concrete inputs and expected outputs for calculations and rules.
- Keep UI details only when they affect meaning, interaction, accessibility, or
  fidelity to an approved design.
- Avoid vague results such as `works correctly`, `is handled`, or `is valid`.
- Do not express development activities as acceptance criteria.
- Do not create scenarios for behaviour that is not supported by the source.

Always cover the primary successful path. Add only the scenario types relevant
to the change:

- alternate valid paths
- empty, invalid, or unavailable data
- permissions and roles
- boundary values and dates
- repeated or duplicate actions
- downstream service failure
- partial success when multiple records are processed
- content, navigation, and accessibility behaviour visible in the prototype

If a relevant case is unresolved, add it to `Decisions needed` rather than
inventing an expected result.

### Out of scope

Name meaningful exclusions that prevent the story from expanding during
implementation. Omit the section when there are none.

### Implementation notes

Include confirmed technical constraints, integration details, feature flags,
or migration considerations. Do not put required product behaviour here. Omit
the section when it adds no value.

### Decisions needed

List only decisions that block implementation or testing. Phrase each as a
specific question. Omit the section when the story is ready.

## Paste-ready output

Return the story first in this format, omitting empty optional sections:

```markdown
# [Title]

## User story

As a [specific actor]
I want [capability]
So that [outcome]

## Context

[Current behaviour, trigger, and relevant constraints.]

## Desired state

**Goal:** [Observable intended outcome]

**Prototype or Figma:** [Specific link or reference]

**Dependencies:** [Only dependencies that affect delivery or behaviour]

## Acceptance criteria

### Scenario: [Name]

Given [starting state]
And [precondition]
When [action or event]
Then [observable result]

## Out of scope

- [Exclusion]

## Implementation notes

- [Confirmed technical constraint]

## Decisions needed

- [Specific unresolved question]
```

After the paste-ready story, briefly identify assumptions, missing decisions,
and any recommended linked testing task. Do not repeat or explain sections that
are already clear.

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
- The outcome explains why the capability matters.
- The story describes one coherent behaviour or outcome.
- Every acceptance criterion has an observable expected result.
- Relevant alternate or failure cases are covered or flagged as decisions.
- Prototype and Figma references point to the relevant screen or state.
- Requirements, implementation notes, and testing operations are separated.
- Empty template headings and placeholder text have been removed.
- The story contains no invented business rules or real citizen information.

If essential information is missing, ask one focused question at a time.

## Creating it in Jira

Only when the user explicitly asks, and only if a Jira project is set (see
[This prototype's Jira settings](#this-prototypes-jira-settings)). Otherwise
draft only and say so.

Connection details, the site and the available tools are in the
`jira-integration` skill; use them to create the issue.

Confirm the issue type and parent only if they are not already known, then
create it in this prototype's Jira project using the paste-ready content.
In `CCPM` the issue types are Story, Task, Bug, Spike and Design Task (plus
Xray test types); use Task for the work listed under "Decide whether this is a
story". **Create it with the status Proposed**, so nobody picks it up before
the team has reviewed it. If Proposed isn't available in that project, create
it in the starting status and tell the user it still needs to be marked as
proposed. Share the new issue's link when you're done.