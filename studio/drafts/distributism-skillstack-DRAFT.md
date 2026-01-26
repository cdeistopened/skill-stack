# The Problem with AI

*Draft - for editing*

---

"The problem with AI is not that there are too many AI millionaires, but that there are too few." — G.K. Chesterton, (paraphrasing)

In the future, everyone will either be ultra wealthy or a slave.

Beff Jezos (the e/acc guy) captured the zeitgeist satirically with his tweet: "If you're not Claude Coding until your eyes bleed every night, you're on the express train to the permanent underclass." 

The vibe on a certain part of X seems to be that if you're not running a hundred AI agents in parallel while you sleep you're going to be ground into the geological substrate by the people who are.

Meanwhile, in the real world, the average normie is checking his email, making powerpoints, copy-pasting prompts into ChatGPT and typing up reports one keyboard click at a time. Like a psychopath. 

I'm reminded of Kim Stanley Robinson: "They lived like monkeys still, while their new god powers lay around them in the weeds."

I'm torn. My everyday reality aligns with the accelerationists - I am running seven terminal windows with Claude Code as I type this. But my aspirational identity is that of a homesteading neo-distributist, perpetually late for my daily milking appointment, who should be spending a lot more time outdoors.

Neither extreme serves us. Not the neo-Luddite denial, not the e/acc death march. 

We also can't resist the reality:
AI is going to be better than humans at almost anything. Pick a task. Any task you can name and describe clearly. Given enough time and compute, the machine will do it faster and cheaper than you. This is just true. Pretending otherwise is cope.

But "almost anything" is not the same as "everything."

Here's where I part ways with the nostalgists. There's a certain strain of conservative thought that wants to protect the jobs we have now because they're the jobs we have now. Tucker Carlson is fiercely protective of trucking because it employs a lot of young men without college degrees. I get the impulse. But I reject the conclusion.

Bullshit email jobs are not a requirement for human flourishing. We've gotten comfortable with them, the way you get comfortable with anything you do for twenty years. But the knowledge economy cubicle farm is not some ancient tradition worth preserving. It's a weird detour we took after manufacturing left and before we figured out what comes next.

What comes next should be ownership. Not wage labor with better tools. Actual ownership - of land, of production, of your own time and attention. The same vision the distributists had over a hundred years ago.

---

## The Distributist Vision, Updated

The distributists never won. Chesterton and Belloc wrote their manifestos at the turn of the last century, arguing for a third way between capitalism and socialism - widely distributed property, small producers, local ownership. Three acres and a cow. It sounded nice. It didn't happen.

What happened instead was the American Century. We came out of World War Two with every other industrial economy in ruins and ours humming. For about twenty years, you could graduate high school, get a union job, buy a house, raise a family on one income. The middle class dream.

But look at what enabled that dream. The interstate highway system. Federally subsidized mortgages. Cheap oil. These weren't neutral policies - they were bets on a particular form of economy. Mass production. Mass consumption. Long supply chains. Economies of scale.

The rules were written by the people who benefited from scale. Not a conspiracy, exactly. Just the predictable result of letting incumbents shape the playing field. It morphed over decades into what we have now - a food system that poisons us, a healthcare system that bankrupts us, a knowledge economy that bores us to death in cubicles.

Distributism lost because scale won. You couldn't compete with the factory, the chain store, the conglomerate. The small operator got squeezed out not by force but by efficiency.

AI changes the math.

Aaron Levie [wrote recently](https://www.linkedin.com/pulse/jevons-paradox-knowledge-work-aaron-levie-qalmc) about Jevons paradox coming to knowledge work. The Tl;dr is that When you make something cheaper, you don't use less of it - you use more. Coal is the textbook economics example. Cheaper AI means more projects get started, more contracts get reviewed, more campaigns get launched. Work expands to fill the newly affordable space.

AI can handle the specifiable tasks. The emails, the reports, the powerpoints, the copy-paste workflows. Good. Let it. Free yourself up for something better.

But what's the something better?

I'm not talking about just "managing the AI," reviewing outputs, or installing yourself programmatically as "the human in the loop." These can easily just become new forms of wage labor - slightly more sophisticated, and infinitely more dystopian.

To me, the something better is deciding what matters in the first place. Choosing which tasks are worth doing. Looking at three unrelated fields and noticing they share a structure. Feeling that something is off about a technically correct answer.

Choosing the exception.

Carl Schmitt wrote that the sovereign is whoever decides the exception. Not whoever follows the rules best, but whoever knows when the rules don't apply.

AI follows rules. Spectacularly well. What it cannot do is recognize that this situation is different, that the playbook breaks down here, that we need to do something that doesn't fit the pattern.

If there's one message you take away from this essay it should be that your only job in the future will be to decide the exception.

There's a definition of AGI floating around - the point at which humans can add nothing to AI's output. But think about what that would require. The AI would need to know not just how to steer, but where you want to go. It would need to know your values, your aesthetics, your particular vision of the good life. And you would need to surrender the right to change your mind.

That's not intelligence. That's tyranny. And it's not coming.

---

## Skill Stacking

Scott Adams popularized the concept of talent stacking. The late great Dilbert creator's idea was simple: to be irreplaceable and one-of-a-kind, you don't need to be the best in the world at any one thing. But you do need to be pretty good at a few things that don't usually go together.

Adams himself wasn't a great artist. He wasn't a great writer. He wasn't a great observer of corporate life. But he was top 25% at all three, and that combination was unreplicable. Dilbert exists because one person happened to be decent at drawing, decent at writing, and had spent enough years in cubicle hell to know what was funny about it.

"Every skill you acquire doubles your odds of success." That's his line. I think he was right.

AI makes this more powerful, not less. AI can be world-class at any single skill you name. It can write better prose than most writers, generate better images than most artists, analyze data better than most analysts. What it cannot do is stack skills across domains the way you can.

It cannot notice that this theological concept applies to that business problem. It cannot feel that this design approach would work for that completely unrelated product. It cannot hold three different fields in its head and see the structure they share.

That's what humans do. That's what you should get good at.

---

## What Skills Actually Are

I've been using the word "skills" loosely. Let me get concrete.

A skill, in my usage, is a modular prompt system that lives in a folder. At its simplest, it's a markdown file with instructions. At its most sophisticated, it includes scripts, references, and assets - everything Claude needs to accomplish a specific type of task.

The key insight is progressive disclosure. You don't dump everything into the AI's context at once. The system works in layers:

1. **Metadata** - A name and description, always visible (~100 words)
2. **Instructions** - The main SKILL.md file, loaded when triggered (<5k words)
3. **Resources** - Scripts, references, assets, loaded as needed (unlimited)

This is context engineering. You're managing what the AI knows and when it knows it. You're building a system that gives Claude exactly the information it needs for each task - no more, no less.

Some examples from my own setup:

**Image Prompt Generator** - A skill that hooks into the Gemini API to create images. It includes a Python script that calls the API, reference files for different visual styles, and a workflow for brainstorming concepts before generating. When I need a thumbnail, I invoke the skill and it walks me through the process.

**Skill Creator** - A meta-skill for building new skills. It includes templates, validation scripts, and best practices. Skills creating skills. Very recursive.

**Writing Style** - A skill that encodes my voice patterns, forbidden constructions (the AI tells we discussed earlier), and editorial preferences. Every writing task loads this skill first.

The point isn't that skills are complicated. The point is that skills let you codify your specific knowledge into reusable processes. You figure out how to do something once, encode it, and then execute it faster every subsequent time.

This is what ownership looks like in the AI age. Not owning the model - you can't. But owning your context. Your workflows. Your particular way of applying AI to problems that matter to you.

---

## Engineer Your Own Obsolescence

Here's the brutal math: if your job can be described as a set of processes - if someone could write a manual for what you do - you're going to be replaced. Not by AI directly. By someone using AI who does your job ten times faster.

You can wait for your employer to figure this out. Or you can figure it out first.

Engineering your own obsolescence means automating the parts of your job you don't want to do, so you can do more of the parts you do. It means taking yourself out of the loop on the mechanical stuff so you can be in the loop on the judgment calls.

This is not the same as "upskilling" or "reskilling" or whatever HR buzzword is popular this quarter. It's not about learning to use new tools so you can keep doing the same job. It's about recognizing that the job itself is going away, and positioning yourself to do the thing that remains.

The thing that remains is deciding the exception.

---

## The Artistry

The moat isn't knowing how to use AI. Everyone will know that. Give it two years, maybe less.

The moat is taste. Judgment. The willingness to throw out a technically correct answer because it doesn't feel right. The ability to recognize when the AI is confidently wrong, when its output is plausible but off, when you need to override the machine.

This is artistry. It cannot be codified. If it could be codified, the AI would already be doing it.

I spend a lot of time these days rejecting AI outputs. Not because they're bad - they're usually pretty good. But because they're not quite right. There's something generic about them, something that doesn't match the specific situation, something that a human would never say that way.

That instinct - the "this isn't right" instinct - is the thing you should be developing. It's the thing that can't be automated. It's the thing that will still have value when everything else has been commoditized.

---

## Three Acres and a Claude

So here we are, back at Chesterton.

The problem with AI is not that there are too many AI millionaires, but that there are too few. The problem isn't the technology - it's the concentration. A few companies own the models. A few platforms control the distribution. A few people capture most of the value.

But it doesn't have to be this way.

The tools are available. The cost is dropping. The capabilities that used to require a team now fit in a terminal window. You can run your own models, build your own workflows, own your own outputs.

Three acres and a Claude. That's the updated distributist vision. Not everyone becoming a tech billionaire - that's just concentration with different winners. Everyone becoming an owner. Of their tools. Of their time. Of their particular corner of the economy.

The distributists lost the last round because scale won. AI changes the math. Scale advantages erode when a single person can do what used to require a department.

This is the moment. Not to grind yourself into the geological substrate chasing some e/acc fantasy. Not to ignore the change and hope it goes away. But to build something you own. To stack skills that can't be replicated. To decide your own exceptions.

The god powers are lying in the weeds. Pick them up.
