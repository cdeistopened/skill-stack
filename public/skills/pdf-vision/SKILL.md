---
name: pdf-vision
description: "Gemini vision-powered PDF to markdown converter. Handles scanned docs, multi-column layouts, tables, footnotes, flowcharts, and degraded documents that text-based extraction destroys. Uses two-tier model routing (cheap model for clean digital pages, capable model for everything else) with per-chunk confidence scoring, anti-hallucination detection, and continual learning from user corrections. Use when a user needs to convert, extract, analyze, or process any PDF document — especially scanned documents, government forms, legal contracts, academic papers, or anything where pypdf/pdfplumber returns garbage or nothing."
license: MIT
compatibility: "Python 3.10+, GEMINI_API_KEY environment variable required"
metadata:
  author: Charlie Deist
  version: 0.2.0
  track: industry
---

# pdf-vision

Vision-powered PDF processing that sees documents the way humans do — not as coordinates and font metadata, but as structured content with meaning.

## When to Use

- Converting PDFs to clean markdown (especially scanned, multi-column, or complex layouts)
- Processing documents that pypdf/pdfplumber/Acrobat garble (tables, flowcharts, footnotes)
- Batch processing document archives
- Extracting structured data from government forms, legal contracts, academic papers
- Any PDF task where text-based extraction fails or returns nothing

## Quick Start

```bash
# Install dependencies
pip install pymupdf google-genai

# Set API key
export GEMINI_API_KEY=your-key

# Analyze a PDF (preflight — no OCR, just document analysis)
python scripts/preflight.py document.pdf

# Convert PDF to markdown
python scripts/ocr_pipeline.py document.pdf

# Convert with custom output path
python scripts/ocr_pipeline.py document.pdf -o output.md

# Convert with specific chunk size
python scripts/ocr_pipeline.py document.pdf -c 8

# Learn from a correction
python scripts/learn.py original.md corrected.md
```

## How It Works

### 1. Preflight Analysis (~$0.005)
Samples 8 pages from beginning, middle, and end of the document. Sends to Gemini flash-lite to detect: document type, language, column layout, footnotes, tables, scan quality, running headers/footers, text density. Configures the entire pipeline automatically.

**Why scattered sampling:** A 123-page Latin manuscript with an English preface fools a first-5-pages sample. Sampling beginning + middle + end correctly detects the real document characteristics.

### 2. Two-Tier Model Routing
Routes documents to the right model based on difficulty:

| Difficulty | Model | Cost/1M tokens (in/out) |
|-----------|-------|------------------------|
| Clean digital | ~~gemini-2.5-flash-lite~~ | $0.10 / $0.40 |
| Everything else | ~~gemini-3.1-flash-lite-preview~~ | $0.25 / $1.50 |

**Why two tiers:** We tested three models on the same 10 Latin manuscript pages. Gemini 3.1 Flash Lite extracted 4x more content (214K vs 50K chars) than 3.0 Flash Preview, while costing half as much. The cheap model handles clean digital docs fine. Everything else goes to 3.1.

### 3. Adaptive Chunking
Chunk size based on document density, not fixed. Dense scholarly text: 6-10 pages. Standard docs: 12-15. Each chunk includes continuation context ("Pages 13-24 of 126. Continue from previous.") for cross-page coherence.

### 4. Per-Chunk Confidence Scoring
Every chunk scored 0.0-1.0 based on: output length vs expected (from preflight word density), truncation detection, garbled text runs, unbalanced markdown, and hallucination detection. Low-confidence chunks flagged in YAML frontmatter for human review.

### 5. Anti-Hallucination Guard
Image-heavy pages (maps, charts, photos) can cause models to fabricate plausible text. Prompt instructs the model to output only `*(Map/image omitted)*` for image pages. Filler-phrase detector flags generic boilerplate in short chunks (e.g., "is well-positioned to support").

### 6. Boundary Smoothing
AI-powered pass that detects and fixes broken sentences, duplicate headers, and artifacts at chunk boundaries.

### 7. Continual Learning
Correct a mistake, run `python scripts/learn.py original.md corrected.md`. Extracts patterns via Gemini, saves to `~/.pdf-vision/corrections.json`. Next run: matching corrections injected as "Known Issues" in the prompt. Works for structural patterns; correctly ignores corrections that contradict what the model sees on the page.

## Output Format

```markdown
---
source_file: document.pdf
pages: 126
processing_date: 2026-03-07T14:30:00Z
models_used:
  gemini-2.5-flash-lite: 80 pages
  gemini-3.1-flash-lite-preview: 46 pages
total_cost: $0.12
avg_confidence: 0.91
low_confidence_pages: [72, 103]
document_type: government-form
language: english
---

# Document Title

[Clean markdown content with preserved structure...]
```

## Customization Points

```
OCR Model (clean pages): ~~gemini-2.5-flash-lite~~
OCR Model (all other pages): ~~gemini-3.1-flash-lite-preview~~
Default language: ~~auto-detect~~
Max chunk size: ~~15 pages~~
Min confidence threshold: ~~0.7~~
Flag for human review below: ~~0.6 confidence~~
Output format: ~~markdown~~
Boundary smoothing: ~~enabled~~
```

## Domain Presets

Configure pdf-vision for your industry:

- Legal: ~~disabled~~ — Preserve clause numbering (1.1, 1.1.1), extract defined terms, detect signature blocks, never summarize clauses
- Medical: ~~disabled~~ — Normalize drug names, format ICD/CPT codes, flag HIPAA content
- Government: ~~disabled~~ — Preserve form field blanks (____), extract checkbox states ([X]/[ ]), keep cross-references (ITB-clause 9.2), preserve tender numbering
- Academic: ~~disabled~~ — Preserve LaTeX equations, extract bibliography, link footnotes bidirectionally
- Financial: ~~disabled~~ — Extract financial tables, detect GAAP/IFRS terminology, preserve audit structure
- Latin Manuscript: ~~disabled~~ — Preserve column markers (col. 1125), keep editorial apparatus ([add. ed.], [om. ed.]), preserve ALL-CAPS chapter headings (CAP. XL), italicize vernacular glosses

## Dependencies

```
pymupdf>=1.24.0
google-genai>=1.0.0
```
