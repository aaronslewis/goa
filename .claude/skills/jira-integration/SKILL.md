---
name: jira-integration
description: Use this skill when retrieving Jira tickets, searching with JQL, creating or editing issues, adding comments, linking issues, or transitioning status in this team's Jira (project CCPM). Covers how to connect through the Atlassian MCP connector, the project's issue types, statuses and custom fields, and how to build rich descriptions. For how to write a story, use write-jira-story.
---

# Jira integration

Read and update the team's Jira through the **Atlassian MCP** connector. There is no API token, `.env` file or `curl` setup to manage: the connector handles auth.

## Connection

| | |
|---|---|
| Site | `https://goa-dio.atlassian.net` |
| cloudId | `4883ba4b-c60d-4b19-819b-78d6db588a17` |
| Project | `CCPM` |
| Scrum board | `174` |

Use the connector named **Atlassian MCP** (tools prefixed `mcp__<id>__`). Two other connectors named *Atlassian Rovo* expose the same site with different tool names; pick one and stay with it. The `plugin:productivity:atlassian` server needs sign-in and isn't needed.

If a call can't find the Atlassian tools, check `session_connectors_status`. A `needs_auth` connector can only be signed in by the user, through `/mcp` or Connectors in claude.ai.

Pass `cloudId` explicitly on every call; it is never filled in for you. If it ever fails, re-fetch it with `getAccessibleAtlassianResources`.

Tools are deferred, so load their schemas with `ToolSearch` (`select:<tool name>`) before calling them. Check the tool's schema rather than guessing parameters.

### Tools

Directly available on the connector:

| Task | Tool |
|---|---|
| Find issues | `searchJiraIssuesUsingJql` |
| Read one issue | `getJiraIssue` (use `view: "full"` for custom fields) |
| Create | `createJiraIssue` |
| Edit fields or description | `editJiraIssue` |
| Comment | `addOrEditJiraIssueComment` |
| Change status | `transitionJiraIssue` |

Everything else goes through `discover` (describe what you want) and then `executeRead`, `executeWrite` or `executeDestructive` with the returned operation name. Never guess an operation name. Ones confirmed to exist:

| Task | Operation | Tier |
|---|---|---|
| Fix versions | `getJiraProjectVersions` | read |
| Sprints and board issues | `getJiraBoardSprintData`, `getJiraBoardIssueData` | read |
| Link types | `listJiraIssueLinkTypes` | read |
| Link two issues | `createJiraIssueLink` | write |
| Add a web link to an issue | `createJiraIssueRemoteIssueLink` | write |
| Issue types, statuses | `listJiraProjectIssueTypesMetadata`, `listJiraStatuses` | read |
| Rich-text format guide | `getContentFormatGuide` | read |
| Attach a file | `uploadAttachmentToJiraIssue` | write |

Reads return markdown by default; ask for `responseContentFormat: "html"` when you plan to edit the description back, since markdown can lose panels, mentions and status lozenges.

## CCPM project

**Issue types:** Epic, Story, Task, Sub-task, Bug, Sub Bug, Spike, Design Task, Idea, plus the Xray types (Test, Test Set, Test Plan, Test Execution, Precondition, Sub Test Execution).

**Statuses seen:** Proposed, In Progress (others exist). Stories and bugs are created as **Proposed** so nobody picks them up before the team reviews them. Transition IDs vary by workflow, so look up the available transitions first and never hard-code an ID.

### Fields

| Field | How to set it |
|---|---|
| Epic | `parent`: the epic's key (e.g. `CCPM-3212`) |
| Fix version | `fixVersions`: `[{"name": "CCA 3.2 - Ack. flow update"}]`; list names with `getJiraProjectVersions` |
| Sprint | `assignToSprint` on create (sprint name or numeric id); `customfield_10021` when reading |
| Story points | `additional_fields: {"Story Points": 5}` (`customfield_10023`) |
| Design (Figma link) | `customfield_10163`; holds an Atlassian design-link object. See below |

**Design field.** On a story this shows as a design-link card (for example `Acknowledgement and onboarding - CCPM- 3215`) pointing at a Figma URL. Try `additional_fields: {"Design": "<figma url>"}` first. If the connector rejects a plain URL, put the link in the Background section of the description, tell the user the Design field needs attaching by hand, and note the result here so the next run skips the guesswork.

## Rich descriptions

Create and edit descriptions as HTML (`contentFormat: "html"`); markdown can't produce panels or status lozenges. Before authoring HTML, fetch the guide with `executeRead` `getContentFormatGuide` `{toolName: "createJiraIssue"}`. The pieces this team uses:

- Note panel: `<div data-type="panel-note"><p>…</p></div>`
- Status lozenge: `<span data-type="status" data-color="blue" data-status-style="bold">ECDS</span>`. Colours are only neutral, purple, blue, red, yellow, green. There is no pink.
- Inline issue link: `<a href="https://goa-dio.atlassian.net/browse/CCPM-3213" data-card-appearance="inline"></a>` (leave the anchor empty)
- Headings `<h1>`…`<h4>`, tables, and expand sections work. Column layouts do not, and make Jira save an empty description.

When editing an existing description, fetch it as HTML first and change only what you were asked to change, so panels and lozenges survive.

## Linking issues

A key in the text is not a link. After a story exists, link each mentioned story with `createJiraIssueLink` (`linkType`, `inwardIssue`, `outwardIssue`): get the type names from `listJiraIssueLinkTypes`. With *Blocks*, `inwardIssue` blocks `outwardIssue`. An epic or parent is the `parent` field, not a link.

## Working rules

- Reading is free. **Ask before** creating, editing, commenting on, linking or transitioning an issue; these are visible to the whole team.
- Write a story with the `write-jira-story` skill, then create it with this one.
- Link rather than copy: point to the PR, prototype URL or Figma frame instead of pasting content.
- Don't put real citizen information in an issue or comment.
- If acceptance criteria are vague, ask before building.
