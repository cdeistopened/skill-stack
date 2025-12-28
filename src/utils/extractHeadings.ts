export interface Heading {
  level: number; // 1, 2, 3, 4, 5, or 6
  text: string;
  id: string;
}

// Generate slug from heading text for anchor links
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Remove code blocks from content to avoid extracting headings from examples
function removeCodeBlocks(content: string): string {
  // Remove fenced code blocks (``` or ~~~)
  let result = content.replace(/```[\s\S]*?```/g, "");
  result = result.replace(/~~~[\s\S]*?~~~/g, "");

  // Remove indented code blocks (lines starting with 4+ spaces after a blank line)
  // This is a simplified approach - we remove lines with 4+ leading spaces that aren't list items
  const lines = result.split("\n");
  const cleanedLines: string[] = [];
  let inCodeBlock = false;
  let prevLineBlank = true;

  for (const line of lines) {
    const isIndented = /^(    |\t)/.test(line) && !line.trim().startsWith("-");
    const isBlank = line.trim() === "";

    if (isBlank) {
      inCodeBlock = false;
      prevLineBlank = true;
      cleanedLines.push(line);
    } else if (isIndented && prevLineBlank) {
      inCodeBlock = true;
      // Skip indented code block line
    } else if (inCodeBlock && isIndented) {
      // Skip continued indented code block line
    } else {
      inCodeBlock = false;
      prevLineBlank = false;
      cleanedLines.push(line);
    }
  }

  return cleanedLines.join("\n");
}

// Extract headings from markdown content (supports H1-H6)
// Ignores headings inside code blocks
export function extractHeadings(content: string): Heading[] {
  // First remove code blocks to avoid extracting headings from code examples
  const cleanContent = removeCodeBlocks(content);

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(cleanContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateSlug(text);

    headings.push({ level, text, id });
  }

  return headings;
}

