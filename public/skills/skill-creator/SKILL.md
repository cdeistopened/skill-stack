---
name: skill
description: Find, install, create, improve, and publish AI agent skills through the Sundial ecosystem. Use when the user wants to find or search for skills, install a skill, create a new skill, improve or evaluate an existing skill, or publish a skill to Sundial Hub. Trigger phrases include "find a skill", "install skill", "create a skill", "make a skill", "improve this skill", "evaluate skill", "publish skill", "push skill", "search for skills".
---

# Skill — The Sundial Meta-Skill

Find, install, create, improve, and publish skills via [Sundial Hub](https://sundialhub.com).

## Agent Detection

Detect the current agent from the skill's load path to set the correct CLI flag:
- `.claude/` in path → `--claude` (default)
- `.cursor/` in path → `--agent cursor`
- `.windsurf/` in path → `--agent windsurf`
- Other → `--claude`

Store the detected flag as `AGENT_FLAG` for use in CLI commands below.

## Find & Install Skills

### Searching

Run:
```bash
npx sundial-hub find "QUERY" --json --limit 10
```

Parse the JSON output array. Each result contains: `name`, `author`, `description`, `installs`, `safety`, `url`.

Present results as a numbered list:
```
1. author/skill-name — Description (installs: N, safety: LEVEL)
   https://sundialhub.com/skills/author/skill-name
2. ...
```

If no results: "No skills found. Browse all at https://sundialhub.com"

### Installing

Ask the user: **project scope** (local to this project) or **global scope** (available everywhere)?

For global install:
```bash
npx sundial-hub add --yes --global AGENT_FLAG author/skill-name
```

For project install:
```bash
npx sundial-hub add --yes AGENT_FLAG author/skill-name
```

After install, show the skill's hub page URL.

## Create a Skill

1. Ask the user what the skill should do and gather concrete usage examples
2. Ask: project scope or global scope?
3. Read [references/skill-creation-guide.md](references/skill-creation-guide.md) for full guidance on skill anatomy, frontmatter spec, body writing, and design patterns
4. Create the skill directory with SKILL.md containing proper frontmatter (`name` + `description`) and markdown body
5. Add any needed `scripts/`, `references/`, or `assets/` subdirectories
6. Validate by running:
   ```bash
   bash scripts/validate_skill.sh PATH_TO_SKILL
   ```
7. Tell the user: "Publish when ready using the publish workflow below"

For workflow patterns, also consult [references/workflows.md](references/workflows.md) and [references/output-patterns.md](references/output-patterns.md).

## Improve a Skill

1. Locate the SKILL.md to evaluate
2. Read [references/improvement-rubric.md](references/improvement-rubric.md) for the full evaluation framework
3. Evaluate the skill across three layers:
   - **Spec checks** (7 pass/fail checks): SKILL.md exists, valid frontmatter, required fields, naming conventions, allowed fields, description constraints
   - **Best practices** (scored out of 100): line count, XML tags, README absence, description structure, actionable instructions, error handling, resource references, trigger phrases, examples
   - **Expert review** (qualitative): progressive disclosure, conciseness, freedom calibration
4. Present findings as a structured report with the score and specific change recommendations
5. After user approval, implement the suggested changes

## Publish a Skill

### Check Authentication

```bash
npx sundial-hub auth status
```

If not authenticated, prompt the user to run:
```bash
npx sundial-hub auth login
```
They can also manage tokens at https://sundialhub.com/settings#tokens

### Validate First

```bash
bash scripts/validate_skill.sh PATH_TO_SKILL
```

All checks must pass before publishing.

### Gather Publish Details

Ask the user for:
- **Version** (semver, e.g. `1.0.0`)
- **Changelog** (brief description of changes)
- **Visibility**: `public` or `private`
- **Categories** (e.g. `Coding`, `Writing`, `Productivity`)

### Push to Sundial Hub

For a new skill:
```bash
npx sundial-hub push SKILL_PATH --version VERSION --changelog "MESSAGE" --visibility public --categories Cat1 Cat2
```

For an existing skill update:
```bash
npx sundial-hub push SKILL_PATH --version VERSION --changelog "MESSAGE"
```

After publishing, show:
- Published skill URL
- Share URL (the `.md` link)

## Troubleshooting

- **`npx sundial-hub` not found**: Ensure Node.js 18+ is installed
- **Auth failures**: Run `npx sundial-hub auth login` or check https://sundialhub.com/settings#tokens
- **Validation failures**: Run `bash scripts/validate_skill.sh SKILL_PATH` and fix reported issues
- **Publish errors**: Ensure all spec checks pass and you have write access

## Links

- Browse skills: https://sundialhub.com
- CLI docs: `npx sundial-hub --help`
- Skill spec: [references/skill-creation-guide.md](references/skill-creation-guide.md)
