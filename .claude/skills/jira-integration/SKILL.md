---
name: jira-integration
description: Use this skill when retrieving Jira tickets, searching with JQL, creating or editing issues, adding comments, or transitioning status in this team's Jira (project CCPM). Covers how to connect through the Atlassian MCP connector and the project's issue types and statuses. For how to write a story, use write-jira-story.
---

# Jira integration

Read and update the team's Jira through the **Atlassian MCP** connector. There is no API token, `.env` file or `curl` setup to manage: the connector handles auth.

## Connection

| | |
|---|---|
| Site | `https://goa-dio.atlassian.net` |
| cloudId | `4883ba4b-c60d-4b19-819b-78d6db588a17` |
| Project | `CCPM` |

Use the connector named **Atlassian MCP** (tools prefixed `mcp__<id>__`). Two other connectors named *Atlassian Rovo* expose the same site and overlap with it; pick one and stay with it. The `plugin:productivity:atlassian` server needs sign-in and isn't needed.

If a call can't find the Atlassian tools, check `session_connectors_status`. A `needs_auth` connector can only be signed in by the user, through `/mcp` or Connectors in claude.ai.

Pass `cloudId` explicitly on every call; it is never filled in for you. If it ever fails, re-fetch it with `getAccessibleAtlassianResources`.

Tools are deferred, so load their schemas with `ToolSearch` (`select:<tool name>`) before calling them. Check the tool's schema rather than guessing parameters.

### Tools that cover most work

| Task | Tool |
|---|---|
| Find issues | `searchJiraIssuesUsingJql` |
| Read one issue | `getJiraIssue` |
| Create | `createJiraIssue` |
| Edit fields or description | `editJiraIssue` |
| Comment | `addCommentToJiraIssue` / `addOrEditJiraIssueComment` |
| Change status | `getTransitionsForJiraIssue`, then `transitionJiraIssue` |
| Link issues | `getIssueLinkTypes`, then `createIssueLink` |
| Issue types for a project | `getJiraProjectIssueTypesMetadata` |

The *Atlassian MCP* connector exposes only a small set directly. For anything else (sprints, boards, deletes), call `discover` with what you want to do, then run the returned operation with `executeRead`, `executeWrite` or `executeDestructive`. Never guess an operation name.

Reads return markdown by default; ask for `responseContentFormat: "html"` when you plan to edit the description back, since markdown can lose panels, mentions and media.

## CCPM project

**Issue types:** Epic, Story, Task, Sub-task, Bug, Sub Bug, Spike, Design Task, Idea, plus the Xray types (Test, Test Set, Test Plan, Test Execution, Precondition, Sub Test Execution).

**Statuses seen:** Proposed, In Progress (others exist). Stories and bugs are created as **Proposed** so nobody picks them up before the team reviews them. Transition IDs vary by workflow, so always call `getTransitionsForJiraIssue` first and never hard-code an ID.

## Working rules

- Reading is free. **Ask before** creating, editing, commenting on or transitioning an issue; these are visible to the whole team.
- Write a story with the `write-jira-story` skill, then create it with this one.
- Link rather than copy: point to the PR, prototype URL or Figma frame instead of pasting content.
- Don't put real citizen information in an issue or comment.
- If acceptance criteria are vague, ask before building.
