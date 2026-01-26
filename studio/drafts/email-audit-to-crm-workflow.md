# How to Turn Your Email History Into a Relationship CRM (With AI)

Your email archive is a goldmine of relationship data you've never organized. Every conversation, every exchange, every warm lead - it's all sitting there in your inbox. Here's how to extract it, analyze it, and turn it into an actionable CRM in a few hours.

---

## The Problem

You have years of email history with hundreds (or thousands) of contacts. Some are warm relationships you've neglected. Some are cold leads that never went anywhere. Some are your most valuable connections hiding in plain sight.

But you don't know:
- Who you've exchanged the most emails with
- Which relationships are bidirectional (they reply) vs. one-way (you're shouting into the void)
- Who you should follow up with
- What topics you discussed

This workflow fixes that.

---

## What You'll Build

A markdown-based CRM with:
- One file per contact
- Exchange counts (sent vs. received)
- Relationship classification (active, warm, dormant, cold)
- Notes on topics discussed
- Priority ranking for follow-up

All portable, searchable, and version-controllable.

---

## Step 1: Export Your Email via Google Takeout

1. Go to [takeout.google.com](https://takeout.google.com)
2. Click "Deselect all" then scroll to **Mail**
3. Click "All Mail data included" and select only the labels you want:
   - **Sent** is the most valuable (your outreach history)
   - Inbox/All Mail for received emails
4. Choose delivery method (download link to email)
5. Wait for export (can take hours for large mailboxes)
6. Download and unzip - you'll get `.mbox` files

**Tip:** Start with just your Sent mail. It's smaller and shows YOUR relationship-building activity.

---

## Step 2: Parse the Mbox File

Mbox is a plain-text format. Each email starts with a `From ` line (note the space). Here's a Python snippet to extract contacts:

```python
import mailbox
from collections import defaultdict
from email.utils import parseaddr
import re

def extract_contacts(mbox_path):
    """Extract contacts with exchange counts from mbox file."""
    contacts = defaultdict(lambda: {"sent": 0, "received": 0, "subjects": []})
    
    mbox = mailbox.mbox(mbox_path)
    
    for message in mbox:
        # Get sender and recipients
        from_addr = parseaddr(message.get("From", ""))[1].lower()
        to_addrs = [parseaddr(addr)[1].lower() 
                    for addr in message.get("To", "").split(",")]
        
        subject = message.get("Subject", "")
        
        # Determine if this is sent or received
        # (adjust YOUR_EMAIL to match your address)
        if "your-email@domain.com" in from_addr:
            # You sent this
            for addr in to_addrs:
                if addr and "@" in addr:
                    contacts[addr]["sent"] += 1
                    contacts[addr]["subjects"].append(subject)
        else:
            # You received this
            if from_addr and "@" in from_addr:
                contacts[from_addr]["received"] += 1
                contacts[from_addr]["subjects"].append(subject)
    
    return contacts

# Usage
contacts = extract_contacts("path/to/Sent.mbox")

# Sort by total exchanges
sorted_contacts = sorted(
    contacts.items(), 
    key=lambda x: x[1]["sent"] + x[1]["received"], 
    reverse=True
)

# Print top 50
for email, data in sorted_contacts[:50]:
    total = data["sent"] + data["received"]
    ratio = f"{data['sent']}:{data['received']}"
    print(f"{email} - {total} exchanges ({ratio})")
```

---

## Step 3: Generate Contact Files

For each contact, create a markdown file with frontmatter:

```markdown
---
name: "Jane Smith"
email: "jane@company.com"
company: "Company Name"
sent_count: 12
received_count: 8
total_exchanges: 20
type: [partner, contributor]
status: warm
priority: high
---

# Jane Smith

**Email:** jane@company.com
**Exchanges:** 12 sent, 8 received (bidirectional!)

## Recent Subjects
- Re: Partnership opportunity
- Quick question about the project
- Follow-up from our call

## Notes

**Relationship:** Strong bidirectional relationship. They respond consistently.

**Next Step:** Follow up on partnership discussion from last month.
```

**Automation tip:** Have Claude Code generate these files in batch from your parsed data.

---

## Step 4: Classify and Prioritize

Review each contact and add classification:

**Status:**
- `active` - Ongoing conversation, recent exchange
- `warm` - Good relationship, but dormant (revive these!)
- `dormant` - No recent contact, but prior relationship
- `cold` - One-way outreach, no response
- `skip` - Vendors, internal, not relevant

**Priority:**
- `high` - Key relationships, high value
- `medium` - Worth maintaining
- `low` - Nice to have, not urgent

**Key insight:** Look at the send/receive ratio. A 1:1 ratio means genuine two-way relationship. A 10:1 ratio (you sent 10, they replied 1) means you're pushing harder than they're pulling.

---

## Step 5: Build Your Pipeline

Create a master pipeline document that groups contacts by action:

```markdown
## Tier 1: Ready to Reach Out (Warm, High Priority)
- [[Jane Smith]] - Partnership follow-up
- [[John Doe]] - Podcast guest, article opportunity

## Tier 2: In Progress
- [[Sarah Connor]] - Already pitched, awaiting response

## Tier 3: Need Warming
- [[Alex Johnson]] - Good contact, but cold. Need fresh angle.
```

---

## The Claude Code Workflow

Here's how I actually did this:

1. **Export:** Google Takeout for Sent.mbox (1.2GB, ~5 years of email)

2. **Parse:** Claude Code ran Python directly on the mbox file, extracting contacts with exchange counts

3. **Generate:** Batch-created 382 contact files with frontmatter

4. **Review:** Went through each contact alphabetically, adding:
   - Type classification
   - Status (warm/cold/active)
   - Priority
   - Notes on relationship and next steps

5. **Prioritize:** Created a Pipeline document tracking who to reach out to, with drafted emails for top prospects

**Time investment:** ~4 hours total for 382 contacts (including drafting outreach emails)

---

## Why This Works

1. **Your email is the truth** - It's your actual relationship history, not what you think you remember

2. **Exchange counts reveal reality** - High bidirectional exchanges = real relationships. One-way = cold outreach that didn't work.

3. **Markdown is portable** - No vendor lock-in. Works in Obsidian, VS Code, any text editor. Version control with git.

4. **AI makes it fast** - What would take days manually takes hours with Claude Code parsing and classifying

---

## Variations

**For Sales:** Focus on leads by deal stage, add revenue potential
**For Networking:** Focus on industry, add connection strength
**For Content Creators:** Focus on potential collaborators, guest opportunities
**For Job Seekers:** Focus on hiring managers, referral potential

The structure adapts to your use case. The data source (your email) is the same.

---

## Getting Started

1. Export your Sent mail from Google Takeout
2. Ask Claude Code to parse the mbox and extract contacts
3. Review the top 50 by exchange count
4. Create files for the ones that matter
5. Classify, prioritize, and take action

Your relationship CRM is already written - it's just buried in your email archive. Time to dig it out.

---

*This workflow was developed while building a contributor pipeline for a content business. The same approach works for sales, networking, job searching, or any relationship-driven work.*
