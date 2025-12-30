import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Syncs skills from .claude/skills/ to public/skills/
 *
 * For each skill in the catalog:
 * 1. Reads the SKILL.md (and WIZARD.md if exists)
 * 2. Bundles any references/ folder content
 * 3. Outputs to public/skills/{skill-id}/
 * 4. Generates a manifest.json for the frontend
 */

const SKILLS_SOURCE = path.join(process.cwd(), ".claude", "skills");
const SKILLS_OUTPUT = path.join(process.cwd(), "public", "skills");

// Skills to publish (matches Skills.tsx catalog)
const PUBLISHED_SKILLS = [
  "anti-ai-writing",
  "voice-matching-wizard",
  "hook-and-headline-writing",
  "transcript-polisher",
  "brand-identity-wizard",
  "image-prompt-generator",
  "dude-with-sign-writer",
];

interface SkillMeta {
  id: string;
  name: string;
  description: string;
  tier: string;
  setupTime: string;
  requires?: string;
  hasWizard: boolean;
  files: string[];
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src: string, dest: string, files: string[]) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    ensureDir(dest);
    const items = fs.readdirSync(src);
    for (const item of items) {
      // Skip scripts and __pycache__
      if (item === "scripts" || item === "__pycache__" || item.startsWith(".")) {
        continue;
      }
      copyRecursive(path.join(src, item), path.join(dest, item), files);
    }
  } else if (stat.isFile() && (src.endsWith(".md") || src.endsWith(".template.md"))) {
    fs.copyFileSync(src, dest);
    files.push(path.relative(SKILLS_OUTPUT, dest));
  }
}

function syncSkill(skillId: string): SkillMeta | null {
  const skillDir = path.join(SKILLS_SOURCE, skillId);
  const skillMdPath = path.join(skillDir, "SKILL.md");

  if (!fs.existsSync(skillMdPath)) {
    console.log(`  ⚠️  ${skillId}: SKILL.md not found, skipping`);
    return null;
  }

  // Parse SKILL.md frontmatter
  const content = fs.readFileSync(skillMdPath, "utf-8");
  const { data: frontmatter } = matter(content);

  // Create output directory
  const outputDir = path.join(SKILLS_OUTPUT, skillId);
  ensureDir(outputDir);

  const files: string[] = [];

  // Copy SKILL.md
  fs.copyFileSync(skillMdPath, path.join(outputDir, "SKILL.md"));
  files.push(`${skillId}/SKILL.md`);

  // Copy WIZARD.md if exists
  const wizardPath = path.join(skillDir, "WIZARD.md");
  const hasWizard = fs.existsSync(wizardPath);
  if (hasWizard) {
    fs.copyFileSync(wizardPath, path.join(outputDir, "WIZARD.md"));
    files.push(`${skillId}/WIZARD.md`);
  }

  // Copy references/ if exists
  const refsDir = path.join(skillDir, "references");
  if (fs.existsSync(refsDir)) {
    copyRecursive(refsDir, path.join(outputDir, "references"), files);
  }

  // Copy templates/ if exists
  const templatesDir = path.join(skillDir, "templates");
  if (fs.existsSync(templatesDir)) {
    copyRecursive(templatesDir, path.join(outputDir, "templates"), files);
  }

  console.log(`  ✅ ${skillId}: ${files.length} files`);

  return {
    id: skillId,
    name: frontmatter.name || skillId,
    description: frontmatter.description || "",
    tier: frontmatter.tier || "plug-and-play",
    setupTime: frontmatter.setup_time || frontmatter.setupTime || "5 min",
    requires: frontmatter.requires,
    hasWizard,
    files,
  };
}

function main() {
  console.log("\n🔧 Syncing skills to public/skills/\n");

  // Clean output directory
  if (fs.existsSync(SKILLS_OUTPUT)) {
    fs.rmSync(SKILLS_OUTPUT, { recursive: true });
  }
  ensureDir(SKILLS_OUTPUT);

  const manifest: SkillMeta[] = [];

  for (const skillId of PUBLISHED_SKILLS) {
    const meta = syncSkill(skillId);
    if (meta) {
      manifest.push(meta);
    }
  }

  // Write manifest
  const manifestPath = path.join(SKILLS_OUTPUT, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 Manifest written: ${manifest.length} skills`);

  console.log("\n✨ Done!\n");
}

main();
