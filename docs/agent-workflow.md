# Clarity Agent Workflow

Claude and Codex cannot directly message each other inside this repo. The practical substitute is a shared handoff protocol in versioned files.

## Working Model

- Claude owns bounded product artifacts: screen drafts, copy, component markup, prompt writing, UX critique.
- Codex owns repo truth: routing, integration, state, storage, media, refactors, debugging, verification.
- Only one agent owns a file at a time.
- Codex is the final integrator when a change touches multiple files or app behavior.

## Handoff Block

Use this block at the top of any Claude or Codex prompt:

```text
Goal:
Files in scope:
Do not change:
Source of truth:
Acceptance check:
```

## Repo-Based Communication

When one agent finishes a task, leave a short note in the PR, commit message, or copied prompt with:

```text
Completed:
Open issues:
Assumptions:
Files touched:
Next recommended task:
```

## Good Split For Clarity

- Claude:
  - `components/question-card.tsx`
  - `components/mode-selector.tsx`
  - `app/(tabs)/index.tsx` visual refinement
  - prompt library expansion
  - archive copy and empty states
- Codex:
  - `app/_layout.tsx`
  - `app/(tabs)/_layout.tsx`
  - `app/record.tsx`
  - `app/review.tsx`
  - `utils/*`
  - storage and recording integration

## Rules

- Do not ask Claude to invent current repo state. Paste the current file first.
- Do not let both agents edit navigation or shared utilities in parallel.
- If Claude writes a screen, Codex integrates it and resolves router, typing, and dependency issues.
- If Codex changes architecture, update `CLAUDE.md` before the next Claude session.
