# Issue 9: The Wizard Pattern

*Build skills that ask questions.*

---

Most prompts are static.

"Write in a professional tone." "Be concise." "Consider the audience."

You copy-paste them, they work the same way every time. No adaptation. No customization.

This is fine for simple tasks. But the interesting work requires context that a static prompt can't have.

---

Enter the wizard pattern.

A wizard is a skill that interviews you before it works. It asks questions. It gathers context. Then it customizes its output based on your answers.

Instead of a static template, you get a conversation. Instead of generic output, you get something tailored.

---

Here's how it works in practice.

The voice matching skill from a few weeks ago? That's a wizard.

It doesn't just analyze your writing samples. It asks follow-up questions:

"Is this fragment style intentional?"
"Do you want to keep these words that appear frequently?"
"Is this a signature move or a one-time thing?"

Your answers shape the voice skill it generates. The output is different for everyone because the interview is different for everyone.

---

Why does this matter?

Static skills work for stable problems. Things that don't change between uses.

But most creative work is idiosyncratic. Your project has quirks. Your brand has nuances. Your preferences are specific.

A wizard adapts to that. It asks the questions a static prompt can't anticipate.

---

The anatomy of a wizard:

**WIZARD.md** - The interview script. A series of questions with wait points. Each question narrows the context.

**SKILL.md** - The working skill that gets generated. Templated, but filled in based on the interview.

**References** - Supporting material the wizard can pull from. Examples, frameworks, patterns.

The user runs the wizard. Answers the questions. Gets a custom skill at the end.

---

Here's a simple example:

Say you want to build a newsletter intro wizard. Static version:

"Write a newsletter intro about [TOPIC]."

Works okay. Generic output.

Wizard version:

"What's your topic?" *[wait]*
"Who's your reader?" *[wait]*
"What tone do you use - urgent, playful, analytical?" *[wait]*
"Paste a previous intro you liked." *[wait]*

Now Claude has four data points. The intro it generates is fitted to your newsletter, not a generic template.

---

The real power: compounding customization.

Once you run a wizard, you have a custom skill. You keep using that skill forever.

You don't run the voice matching wizard before every piece of writing. You run it once, get your voice skill, and use that skill for years.

The interview captures deep context. The skill applies it repeatedly.

---

How to convert a static prompt to a wizard:

**Step 1:** Identify what varies between uses. What would you need to know to customize this?

**Step 2:** Turn those variables into questions. "What's your audience?" "What tone do you prefer?" "Show me an example you liked."

**Step 3:** Create a WIZARD.md with wait points. The AI asks one question, waits for your answer, then continues.

**Step 4:** Template a SKILL.md that gets populated by the answers. Leave placeholders where custom content goes.

That's it. You've converted a static prompt into an adaptive system.

---

The skill this week is a wizard builder.

You give it your static prompt. It identifies the variables. It generates a WIZARD.md that asks the right questions.

Meta, I know. A wizard that builds wizards. But this is how you scale. Every workflow you use regularly can become a wizard.

---

A note on why this matters:

The people selling $200 "skill packs" are selling static prompts. Fancy formatting, but no adaptation.

Wizards are the next level. They ask before they act. They customize instead of generalize. They fit you instead of forcing you to fit them.

This is where skills become genuinely useful. Not recipes to follow, but collaborators that learn.

---

Try it this week.

Take a prompt you use regularly. Identify two things that vary between uses. Turn them into questions.

Run the wizard version. See how the output changes.

That's the pattern. Once you see it, you'll want wizards everywhere.

---

Next week: A New Rerum Novarum. Why all of this matters beyond productivity.

— Charlie

---

**Download this week's skill:** [Wizard Builder →]

**P.S.** The best skills don't assume. They ask.
