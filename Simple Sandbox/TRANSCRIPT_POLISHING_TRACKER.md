# Transcript Polishing Project Tracker

**Project Goal:** Polish 10 raw Ray Peat interview transcripts from "Politics & Science" radio show

**Instructions for AI Agent:** Work on transcripts in **small sections** (3-5 topic sections at a time) to avoid token limits. After completing a section batch, commit your work, then continue with the next batch.

---

## Core Polishing Principles (Reference)

1. **100% Fidelity** - Preserve every fact, figure, mechanism exactly as spoken
2. **Maximum Clarity** - Fix transcription errors, add punctuation, break up walls of text
3. **Preserve Voice** - Keep Dr. Peat's authentic speaking style
4. **Remove Noise** - Cut timestamps, station mechanics, legal disclaimers
5. **Orient Reader** - Add headers BEFORE the host question that introduces the topic
6. **Add Searchability** - 3-5 tags per section

---

## Step-by-Step Process for Each Transcript

### Phase 1: Preparation
1. Read entire raw transcript
2. Identify speakers (Speaker A/B/C → actual names)
3. Note major topic transitions
4. Plan section breaks (aim for 3-5 sections per batch)

### Phase 2: Polishing (Work in Batches)
**For each batch of 3-5 sections:**

1. **Create header** BEFORE the host question/comment that introduces the topic
2. **Add tags** (3-5 searchable tags in italics below header)
3. **Remove timestamps** - Delete all `[0:00-0:00]` prefixes
4. **Remove noise** - Station IDs, disclaimers, contact info, show logistics
5. **Fix speakers** - Format as `**Speaker Name:**`
6. **Break paragraphs** - 3-4 sentences maximum
7. **Fix errors** - Transcription mistakes, punctuation
8. **Preserve content** - Keep all facts, figures, references, voice exactly

### Phase 3: Completion
1. **Create index** - Add line-numbered index at end
2. **Quality check** - Verify fidelity, headers, tags, formatting
3. **Save** - Write to `Polished Transcripts/` folder
4. **Commit** - Push to git branch

---

## Transcript Status Tracker

### ✅ Completed (8/10)
- [x] **The Hormones Behind Inflammation** (Ask Your Herb Doctor show - different series)
- [x] **Autoimmune and Movement Disorders** (256 lines → 359 polished lines, 16 sections)
- [x] **Food Quality** (334 lines → 371 polished lines, 22 sections)
- [x] **Coronavirus Part 1** (388 lines → 412 polished lines, 17 sections)
- [x] **Coronavirus Part 2** (412 lines → 403 polished lines, 17 sections)
- [x] **Coronavirus Part 3** (358 lines → 516 polished lines, 29 sections)
- [x] **Fats** (409 lines → 366 polished lines, 18 sections)
- [x] **Empiricism vs Dogmatic Modeling** (412 lines → 349 polished lines, 16 sections)

### 🚧 In Progress (0/10)
- [ ] None currently

### 📋 To Do (2/10)

#### Batch 1: Shorter Transcripts (Start Here)
1. ~~**Autoimmune and Movement Disorders**~~ ✅ COMPLETED
   - Status: DONE - 16 sections, 359 lines
   - Committed: 1648607

2. **Food Quality** (334 lines)
   - Status: Not started
   - Estimated sections: ~8-10
   - Estimated batches: 2-3

3. **Coronavirus, immunity, and vaccines (Part 3)** (358 lines)
   - Status: Not started
   - Estimated sections: ~8-10
   - Estimated batches: 2-3

#### Batch 2: Medium Transcripts
4. **Coronavirus, immunity, and vaccines (Part 1)** (388 lines)
   - Status: Not started
   - Estimated sections: ~10-12
   - Estimated batches: 3-4

5. **Fats** (409 lines)
   - Status: Not started
   - Estimated sections: ~10-12
   - Estimated batches: 3-4

6. **Empiricism vs Dogmatic Modeling** (412 lines)
   - Status: Not started
   - Estimated sections: ~10-12
   - Estimated batches: 3-4

7. **Coronavirus, immunity, and vaccines (Part 2)** (412 lines)
   - Status: Not started
   - Estimated sections: ~10-12
   - Estimated batches: 3-4

#### Batch 3: Longer Transcripts
8. **Evolution** (490 lines)
   - Status: Not started
   - Estimated sections: ~12-15
   - Estimated batches: 4-5

9. **A Self Ordering World** (238 lines)
   - Status: Not started (may already be polished - need to verify)
   - Estimated sections: ~6-8
   - Estimated batches: 2

10. **Biochemical Health** (565 lines - LARGEST)
    - Status: Not started
    - Estimated sections: ~15-18
    - Estimated batches: 5-6

---

## Working Instructions for AI Agent

### When Starting a New Transcript:

```
1. Read the full raw transcript
2. Announce: "Starting [Transcript Name] - working on sections 1-5"
3. Create document header with title and metadata
4. Polish first batch (3-5 sections)
5. Save progress
6. Commit and push to git
7. Continue with next batch
```

### Token Management Strategy:

- **Under 100k tokens remaining:** Complete current section batch, then STOP
- **Between 100k-150k tokens:** Work on next batch (3-5 sections)
- **Over 150k tokens:** Can work on larger batches (5-8 sections)

### Section Batch Size Guidelines:

- **Short sections** (5-10 speaker exchanges): Batch 5 sections
- **Medium sections** (10-20 speaker exchanges): Batch 4 sections
- **Long sections** (20+ speaker exchanges): Batch 3 sections
- **Very long sections** (30+ speaker exchanges): Batch 2 sections

### Git Commit Strategy:

After each batch, commit with message format:
```
Polish [Transcript Name]: sections [X-Y] ([topic summary])

- Completed sections: [Section 1 Title], [Section 2 Title], etc.
- [X] sections complete, [Y] sections remaining
```

---

## Quality Checklist (Before Marking Complete)

For each finished transcript, verify:

- [ ] All timestamps removed
- [ ] All station mechanics/disclaimers removed
- [ ] Headers placed BEFORE host questions introducing topics
- [ ] 3-5 tags per section
- [ ] Speakers correctly identified throughout
- [ ] Paragraphs broken into 3-4 sentence chunks
- [ ] All facts/figures/references preserved exactly
- [ ] Dr. Peat's voice and phrasing preserved
- [ ] Complete index with accurate line numbers at end
- [ ] File saved to `Polished Transcripts/` folder
- [ ] Changes committed and pushed to git

---

## Notes

- **Header Placement Rule:** The header introducing a new topic should appear BEFORE the host's question/comment that begins that discussion
- **Speaker Names:** For Politics & Science show, typically John Barkhousn (host) and Dr. Raymond Peat (guest)
- **Tag Format:** `*tag1, tag2, tag3, tag4, tag5*` (lowercase with hyphens)
- **Index Format:** `Line X - [Section Title]` using actual line numbers from polished file

---

## Progress Summary

**Total Transcripts:** 10
**Completed:** 7 (Autoimmune, Food Quality, Coronavirus Parts 1-3, Fats, Empiricism)
**In Progress:** 0
**Remaining:** 3
**Completion:** 70%

**Next Action:** Continue with final 3 transcripts (Biochemical Health, Evolution, A Self Ordering World)
