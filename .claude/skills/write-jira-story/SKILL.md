---
name: write-jira-story
description: Use when drafting, reviewing, or creating a Jira story from this prototype, a Figma design, or an observed product behaviour. Produces concise stories in the CCPM team's format (user story panel, portal and user labels, numbered acceptance-criteria to-do list, compact Given/When/Then for variations). Separates product acceptance criteria from testing operations such as test data, environment setup, evidence, regression, and release sign-off.
---

# Skill: Write a Jira story

Turn prototype evidence into a Jira story that another product, design,
development, or testing team member can understand and verify without guessing. Remove any section that would be empty.

The Jira reader is a domain-fluent worker. Write for quick scanning, preserve
precise service vocabulary, and remove background that does not help the team
decide, build, or test the change.

## This prototype's Jira settings

- **Jira project:** `CCPM`
- **Site:** `https://goa-dio.atlassian.net`
- **Portals:** ECDS (internal, blue lozenge) and Child Care Licensing Portal
  (external, purple lozenge)

If there's no Jira project set, set is as CCPM.
**Draft stories first before updating the Jira ticket.** Say so when you hand over
the draft.

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
system behaviour that the source does not establish. Put unresolved matters in
the story as dark orange notes right where they apply (see "Notes and open
questions"), and list them in your hand-over (see "After the story").

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

## Language and wording

- **Canadian English spelling:** behaviour, colour, centre, organization (the
  `-ize` ending is standard in Canada), cancelled, grey, and so on.
- **Licence is the noun; license is the verb.** Write "licence status", "License Holder Organization", "licence
  holder", "a valid licence", but "licensed programs" and "to license a
  facility" (the rule from [CCPM-2875](https://goa-dio.atlassian.net/browse/CCPM-2875)).
  This applies to prose, criteria and labels you write.
- **Capitalization:** page names may be in title case (Legal, Terms of Use). Button
  and link text, and headings (on-screen headings and the story's own headings),
  are in **sentence case**: Start next acknowledgement, Continue to portal,
  Information and privacy notice. Copy a name's capitalization from the
  prototype; if the prototype breaks this rule, raise it with the user as a
  fix to the prototype instead of copying it.
  - **Flag issues:** Where the prototype or product still shows an older spelling that doesn't adhere to these rules, flag it as a fix instead of copying it.


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

Use the actor shown by the evidence, such as Super Admin, CCLP user, or Licensing Officer. Do not use generic actors such as `User`.
If the actor is unclear, ask for clarification. If no meaningful actor or outcome exists, create as a Task rather than as a Story.

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
criteria. The design and prototype links go in the Design section, not here. Minimize design process decision logging in the Background.  

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

Add the design links as official linked designs.

### Acceptance criteria

Write a numbered to-do list the developer can work through and the tester can
cite. Group related criteria under H2 headings, and number each criterion
`AC <group>.<item>`. Each criterion is the number, a short **bold label**, a
dash, then one sentence. The label tells the developer what to do; the sentence
tells what the user will experience:

```text
1. Choosing an organization            (H2)
AC 1.1 **Add organization dropdown** — The Declaration step includes an organization dropdown.
AC 1.2 **Disable signed organizations** — Organizations that have signed appear disabled with a checkmark.
AC 1.3 **Hide next action** — Given the Licence Holder Organization has no
licensed programs, when the user starts the acknowledgement, then Start next
acknowledgement is not shown.
```

Rules:

- **The label is a verb, then the subject or noun, written for the developer.**
  Examples: Add menu item, Hide next action, Sort rows by organization, Remove
  profile links. Use two to four words, in sentence case. Start with the thing
  to build or change (Add, Show, Hide, Disable, Remove, Sort, Link, Validate),
  not a description of the outcome.
- **The sentence is what the user experiences,** in the user's terms: what they
  see, can do or can't do. Don't repeat the label's wording or describe
  implementation.
- The bold label is the only bold in a criterion. Do not bold terms inside the
  sentence.
- When a condition or trigger matters, write the sentence as Given / when / then
  (see below); otherwise state it plainly.
- **Style on-screen text consistently; no quote marks.** Write every name
  exactly as it appears on screen, and style it by kind:
  - **Buttons and links:** dark blue (`#0747a6`), not italic.
  - **Page titles, section titles (headings, container and card titles) and
    other UX copy** (descriptions, messages, labels, column headers,
    placeholders): *italic*, in the normal text colour.
  - Nothing else is italic or coloured. The story's own headings and bold labels
    are not on-screen text, and stay as they are.

  Style alone doesn't carry meaning, so add the noun where a name could be
  mistaken for something else ("the Start next acknowledgement button", "the
  Confirmation page"). In a chat draft, use markdown italics for on-screen text
  and plain text for buttons; the colours only appear in the Jira HTML.
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

#### Given / when / then

Use it when a criterion depends on a state or trigger, especially when **one
behaviour has several variations** (roles, states, data conditions) or reads
best from the user's side. Keep it light:

- **The label does the leading.** The verb-first bold label says what to build,
  so the reader does not have to reach the end of the sentence to find the
  point. Write `Given`, `when` and `then` in plain text, in one sentence.
- **Write the result last and keep it short.** Keep the Given to the state that
  matters.
- **State the shared Given once.** For several variations, use one lead-in
  criterion and a table, not a repeated sentence:

  ```text
  AC 2.3 **Show next action** — Given the user has completed an acknowledgement:

  | When | Then |
  |---|---|
  | Organizations are outstanding | Start next acknowledgement is shown |
  | All are complete | Only Continue to portal is shown |
  ```

  Use `Given | When | Then` columns only if the Given also varies. Colour
  button names in table cells the same way as in sentences.

### Out of scope

Name meaningful exclusions that prevent the story from expanding during
implementation, as ❌ bullets. Omit the section when there are none.

### Dev notes

Confirmed technical details only: components, routes, services, feature flags,
data sources, integration details, migration considerations, links to prototype
code. Do not put required product behaviour here. **If there are no notes, omit
the whole section, heading included.** Never write "None" or "N/A".

## Links

**Web addresses are always hyperlinks.** Any URL that appears in the story, such
as `https://childcareoperators.alberta.ca/terms-of-use`, is written as
`<a href="URL">…</a>`, never as plain text. Use the page name as the link text
when it is known, otherwise the URL itself. This applies in every section.

### Related stories

Link related stories whenever there are any. **Mentioned stories must be
officially linked,** in two ways:

1. In the text, write the key as an inline smart link, not plain text:
   `<a href="https://goa-dio.atlassian.net/browse/CCPM-3213" data-card-appearance="inline"></a>`.
2. After the story exists, create a Jira issue link to each with
   `createJiraIssueLink`, using the link type that describes the relationship:

| Relationship | Link type | How to read the result |
|---|---|---|
| This story can't be built or released until another story is done (a dependency) | **Blocks** | This story **is blocked by** the other: `inwardIssue` = the other story, `outwardIssue` = this story |
| This story blocks another story | **Blocks** | This story **blocks** the other: `inwardIssue` = this story, `outwardIssue` = the other story |
| This story changes or builds on an earlier story | **Relates** | Both show **relates to** |
| Another story in the same epic that is related but not a dependency | **Relates** | Both show **relates to** |

**Use "is blocked by" for every dependency.** Don't downgrade a dependency to
*relates to*. If the dependency is only an assumption, say so and ask. Never use
*Cloners*, *Duplicate* or *Prerequisites* unless the user asks. After linking,
read the issue back and check the wording on this story says "is blocked by",
not "blocks", where this story is the dependent one.

**Ask about related stories for every story.** Once the epic is known (see
"Creating it in Jira"), search the stories in it:
`parent = <epic key> ORDER BY created DESC`. Show the key and summary of each,
and ask in one message:

- Which of these are related?
- Does this story depend on any of them, or on a story in another epic
  (**is blocked by**)? Does it block any?
- Does it change or build on an earlier story, in this epic or another?

If the story has no epic yet, still ask the second and third question. Don't
guess a relationship from titles alone. Offer "none" for each, and skip the
links if the answer is none.

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
<p>AC 1.1 <strong>[Verb and noun]</strong> — [What the user experiences. Button: <span style="color: #0747a6">Button name</span>. Page or UX copy: <em>Page title</em>.]</p>
<p><span style="color: #db6e21">Question: [Open question about AC 1.1, placed right under it.]</span></p>

<h1>Out of scope</h1>
<ul><li>❌ [Exclusion]</li></ul>

<h1>Dev notes</h1>
<ul><li>[Confirmed technical detail]</li></ul>
```

Use `data-color="blue"` and the text `ECDS` for the internal portal. A
Given / When / Then table is a normal `<table>` with `<thead>`/`<tbody>`.
Omit empty sections.

## Notes and open questions

Put comments and unresolved questions **in the story, right where they apply**,
in dark orange (`#db6e21`), as their own short paragraph directly under the
criterion or section they concern. Start with "Question:" for something that
needs an answer or "Note:" for context the team should know. Phrase a question
so it can be answered with a decision. Use the same orange for nothing else.

`#db6e21` is the orange Jira's own editor shows. It isn't in the text-colour
list the connector documents (which has only `#ff991f`), so the first time you
create a story with a note, read the issue back as HTML and check the colour
survived. If Jira dropped or changed it, tell the user. Begin each note with the
word "Question" or "Note" so it doesn't rely on colour. In a chat draft, show a
note as `[Question: …]`.

Notes are for matters that block or change building or testing. Delete a note
once it's answered, and don't keep one that has become a criterion.

## After the story

Under the story, briefly list the assumptions you made, the orange notes (so
the user can answer them without scrolling the story), and any recommended
linked testing task. Do not repeat or explain sections that are already clear.


## Review the draft

Run this review on every draft before you show it as final, and again before
creating the issue. Fix what you find, and tell the user what you changed.

### 1. Naming consistency pass

The same thing must have **one name** everywhere in the story. Read the draft
once just to collect names, then compare:

1. List every named thing: pages, containers and sections, buttons and links,
   menu items, table columns, fields, roles, organization types, documents and
   notices.
2. For each, find every place it appears: the title, the user story panel, the
   user line, Background, Design, every criterion **and its bold label**, Out of
   scope and Dev notes.
3. Make each one match, including capitalization and wording. A short or
   lowercase variant is a slip when it refers to the same thing.
   Example: "privacy notice", "Privacy Notice" and "Information and privacy
   notice" are three names for one container; use the exact name the user sees,
   "Information and privacy notice", in every place. Likewise "Licence Holder
   Organization" and "License Holder Organization" cannot both appear.
4. Take the exact wording from the prototype or Figma, not from memory. If the
   source uses two names, or you can't tell which is right, ask the user rather
   than picking one.
5. Make bold labels reuse the full name of the thing they describe, so a label
   like "Privacy notice link" becomes "Information and privacy notice link".
6. Generic words are fine in running text only when the full name appears
   nearby ("the privacy notice link in the Information and privacy notice
   container" is ok; "the privacy notice container" is not).
7. Check wording against "Language and wording": Canadian spelling, licence
   versus license, Licence Holder Organization written exactly, buttons and
   headings in sentence case, pages in title case if you like but consistent.

### 2. Readiness check

Then verify:

- The actor is specific and supported by the evidence.
- The portal (lozenge) and the user are stated up front.
- The outcome explains why the capability matters.
- The story describes one coherent behaviour or outcome.
- Every acceptance criterion has an observable result and a short bold label
  that starts with a verb, with no other bold in the sentence.
- Button names are dark blue; page and section titles and other UX copy are
  italic; none has quote marks; and every web address is a hyperlink.
- Relevant alternate or failure cases are covered or raised as dark orange
  notes in place.
- Variations use a table with the shared Given stated once.
- The Design section has Figma and prototype links that point to the relevant
  screen or state, or the user confirmed there are none.
- Related stories were asked about, mentioned stories are smart links in the
  text, and each is a linked issue in Jira with the right type (dependencies are
  "is blocked by").
- Requirements, dev notes, and testing operations are separated.
- Empty sections, and placeholder text, have been removed.
- The story contains no invented business rules or real citizen information.

If essential information is missing, ask one focused question at a time.

## Creating it in Jira

Only when the user explicitly asks, and only if a Jira project is set (see
[This prototype's Jira settings](#this-prototypes-jira-settings)). Otherwise
draft only and say so. Connection details and tools are in the
`jira-integration` skill.

Run "Review the draft" first, including the naming consistency pass.

**Ask before creating, in one message:**

- **Design and prototype links:** ask for a link to the design (Figma) and to
  the prototype, unless you already have them. Either one is enough.
- **Epic:** offer the open epics (`issuetype = Epic AND project = CCPM AND
  statusCategory != Done`), or none.
- **Fix version:** offer the unreleased versions from `getJiraProjectVersions`,
  or none.
- **Sprint:** offer the active and future sprints on board 174 (from
  `getJiraBoardSprintData`), or none.

Then ask the **related stories** questions from "Links" (stories in the same
epic, dependencies, earlier stories this one modifies). They need the epic, so
ask them right after it is chosen, and before you draft the Background, since a
dependency or a change to an earlier story belongs in the text.

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
create the issue links for every related story (dependencies as **Blocks**, so
this story reads "is blocked by"), then share the new issue's link.
