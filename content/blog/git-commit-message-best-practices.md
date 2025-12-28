---
title: "Git commit message best practices"
description: "A guide to writing clear, consistent commit messages that help your team understand changes and generate better changelogs."
date: "2025-12-14"
slug: "git-commit-message-best-practices"
published: true
tags: ["git", "development", "best-practices", "workflow"]
readTime: "5 min read"
featured: false
authorName: "Markdown"
authorImage: "/images/authors/markdown.png"
excerpt: "Learn the Conventional Commits standard and write commit messages that make your project history clear and useful."
---

# Git commit message best practices

Good commit messages make project history readable. They help teammates understand changes, generate changelogs automatically, and make debugging easier. This guide covers the most common standard: Conventional Commits.

## Why commit messages matter

Commit messages document what changed and why. They serve as a project timeline. Clear messages help when:

- Reviewing code changes
- Debugging issues
- Generating release notes
- Onboarding new team members
- Understanding project evolution

Bad commit messages like "updates" or "fix" provide no context. Good messages explain the change and its purpose.

## The Conventional Commits standard

Conventional Commits is the most widely adopted format. It uses a simple structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The type and description are required. Everything else is optional.

## Commit types

Use these standard types:

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature                                     |
| `fix`      | Bug fix                                         |
| `docs`     | Documentation changes                           |
| `style`    | Formatting, missing semicolons (no code change) |
| `refactor` | Code restructuring without changing behavior    |
| `perf`     | Performance improvements                        |
| `test`     | Adding or updating tests                        |
| `chore`    | Maintenance tasks, dependency updates           |
| `ci`       | CI/CD changes                                   |
| `build`    | Build system changes                            |
| `revert`   | Reverting a previous commit                     |

## Writing good commit messages

### Subject line rules

Keep the subject line under 50 characters. Use imperative mood. Write "add feature" not "added feature" or "adds feature".

**Good examples:**

```
feat: add search functionality
fix: resolve write conflict in stats mutation
docs: update README with sync commands
refactor: simplify theme context logic
perf: optimize post query with index
```

**Bad examples:**

```
feature: updates
fix: bug
docs: changes
```

### Adding a body

For complex changes, add a body after a blank line. Explain what changed and why:

```
feat: add visitor tracking to stats page

Track active sessions using heartbeat system with 30-second
intervals. Sessions expire after 2 minutes of inactivity.
Uses event records pattern to prevent write conflicts.

Closes #123
```

### Using scopes

Scopes are optional but helpful for larger projects. They indicate which part of the codebase changed:

```
feat(api): add pagination to posts endpoint
fix(ui): resolve mobile menu closing issue
docs(readme): add deployment instructions
```

## Common patterns

### Feature additions

```
feat: add dark mode toggle

Implements theme switching with localStorage persistence.
Supports four themes: dark, light, tan, cloud.
```

### Bug fixes

```
fix: prevent duplicate heartbeat mutations

Adds 5-second debounce window using refs to prevent
overlapping calls. Resolves write conflicts in activeSessions.
```

### Documentation updates

```
docs: add Convex best practices section

Includes patterns for avoiding write conflicts, using
indexes, and making mutations idempotent.
```

### Refactoring

```
refactor: extract search logic into custom hook

Moves search state and handlers from component to
useSearch hook for better reusability.
```

## Benefits of consistent commits

### Automatic changelog generation

Tools like semantic-release read commit messages and generate changelogs automatically. Each `feat:` becomes a minor version bump. Each `fix:` becomes a patch.

### Better code review

Reviewers see the intent immediately. A commit titled "feat: add search modal" is clearer than "updates".

### Easier debugging

When investigating issues, clear commit messages help identify when bugs were introduced. Git blame becomes more useful.

### Team collaboration

Consistent messages create shared understanding. New team members learn the pattern quickly.

## Quick reference

**Format:**

```
<type>: <description>
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert

**Rules:**

- Use lowercase for types
- Imperative mood ("add" not "added")
- Under 50 characters for subject
- No period at end of subject
- Add body for complex changes

**Examples:**

```
feat: add search functionality
fix: resolve write conflict in stats mutation
docs: update README with sync commands
refactor: simplify theme context logic
perf: optimize post query with index
chore: update dependencies
```

## Setting up commit templates

Create a git commit template to remind yourself of the format:

**Create `.gitmessage` in your project root:**

```
# <type>: <subject>
#
# <body>
#
# <footer>
```

**Configure git to use it:**

```bash
git config commit.template .gitmessage
```

Now when you run `git commit`, your editor opens with this template.

## Using commit hooks

Pre-commit hooks can validate commit messages automatically. Tools like commitlint check format before commits are accepted.

**Install commitlint:**

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

**Create `commitlint.config.js`:**

```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

**Add to `.husky/commit-msg`:**

```bash
npx --no -- commitlint --edit $1
```

This enforces the format on every commit.

## Summary

Good commit messages follow a simple pattern: type, colon, description. Use Conventional Commits for consistency. Keep subject lines under 50 characters. Use imperative mood. Add bodies for complex changes.

The format is simple but powerful. It makes project history readable, enables automatic tooling, and helps teams collaborate effectively.

Start with the basic format. Add scopes and bodies as your project grows. Consistency matters more than perfection.
