---
title: "How to Develop Feel for AI"
slug: "prompt-101"
description: "You don't have to be an engineer to be a racing driver, but you do have to have Mechanical Sympathy."
date: "2023-12-15"
tags: ["prompt-engineering", "frameworks", "commanding-the-page"]
image: "/images/thumbnails/prompt-101.png"
---

*"You don't have to be an engineer to be a racing driver, but you do have to have Mechanical Sympathy."*
— Jackie Stewart, racing driver

There's only one way to learn to steer a sailboat downwind in heavy seas, and it's not by just sitting and reading about it. Although studying physics, naval architecture, or fluid dynamics might give you a conceptual underpinning, it only gets you so far on the water. After some amount of orientation, you must take the helm and develop your own feel for the boat's motions. At first, the motions feel tense and awkward. But soon, your subconscious begins to anticipate each approaching swell until the boat transforms into an extension of your very being.

British Formula One racing champion Jackie Stewart called this bond "mechanical sympathy" — the indescribable metaphysical connection between humans and their tools. While certain racecar drivers may possess a stronger innate affinity for their vehicles, anyone can achieve this sympathy with any tool. Developing it with Large Language Models doesn't require you to understand what those squirrels are doing "under the hood" with the valves. All it takes is curiosity and a determination to learn from the inevitable mistakes and missteps.

## Tools for Titans: The AI-Assisted Writing Tech Stack

In my work as a writer and radio/podcast producer, I rely on three AI software tools: NotionAI, ChatGPT, and its rival, Claude.

Claude is my preferred chatbot/LLM for most of my writing tasks. Claude is often labeled as an "AI assistant," combining its natural language intelligence with one crucial advantage for writers like me. Claude allows users to bring their own "source material" into the conversation as the vital context for its LLM output.

Notion is a cloud-based workspace tool and the Swiss Army Knife of software. The integration of NotionAI, powered by Claude, augments Notion's capabilities with AI-assisted functionalities. Through NotionAI, users can access a suite of AI-driven commands, including the **Improve writing** feature and a set of bespoke prompts that utilize Claude's language processing strengths.

## The Elements of Natural Language Programming

### Prompts

At its most basic level, a prompt is a set of instructions that you provide to a large language model. These instructions guide the model in generating a useful response. Since language models are designed to understand natural human language, it's best to communicate with them simply and directly — as you would with a human assistant.

The first step in engineering your prompts is gaining clarity about what you want AI to *do*. You must define the problem you need AI to solve or the task you want it to complete. A prompt cannot be effective if the goal itself is ambiguous.

Your instructions can be framed as either **questions** or **commands**. The model will infer what you mean either way.

### Examples vs. Instructions

While **instructions** can give the model a sense of *what* you want it to do, **examples** will improve its understanding of *how* you want it to do something. Examples can help convey the preferred format, tone, or style or demonstrate the desired structure or organization of information.

- **One-shot** prompting: Providing a single example of the desired output
- **Few-shot** prompting: Providing a small number of examples to guide the model's output
- **Many-shot** prompting: Providing a large number of examples (generally only necessary for fine-tuning specialized LLMs)

Usually, one-shot or few-shot prompting is sufficient for training AI to give you what you want.

### Source Material and the Context Window

The context window refers to the total amount of conversation history and content that the chatbot can comprehend at once while generating a response. The context window determines the extent to which chatbots like Claude and ChatGPT can actively consider the conversation record and any attached documents when formulating a response.

**Pro Tip:** Even with a larger context window, you only want to provide the context necessary for the model to perform the task at hand. Past a certain point, there are diminishing returns to providing additional context. Too much context risks distracting from the core task.

For a longer prompt, it helps to repeat the basic instruction both at the beginning and the end. LLMs are "biased" to put more weight on both the first and final tokens of the prompt and less weight on the middle.

The purpose of a large context window isn't just to handle lengthy instructional prompts. Its real value is enabling chatbots to incorporate more of your own content to generate tailored responses.

In this book, we'll focus on prompts that serve to **transform your own source material**, not just generate new content. The goal is to collaborate with Claude to elevate your existing work.

## Prompting Frameworks: A Shortcut to Mechanical Sympathy

The basic elements of prompting are:

- **Instructions** — What you want the model to do, framed as either a command, a question, or a continuation
- **Examples** — Representations of the desired output, in terms of style, content, or format
- **Inputs** — The details, context, constraints, or "source material" that the model will act upon
- **Formatting** — The structure of both the inputs and desired outputs
- **Tokens** — The units of text that the language model processes

### Role-Task-Format (RTF)

Perhaps the most basic prompting framework. You establish AI's role, the task it must complete, and the expected output format.

Specifying a role for the model unlocks one of the greatest powers of LLMs — a pattern-recognition engine that can imitate either the specific knowledge of a particular type of person, or even the subtleties of a specific writer's voice.

### RODES Framework

RODES stands for Role, Objective, Details, Examples, and Sense Check. This framework is helpful when you have a specific idea of the kinds of output you are looking for.

The sense check is a way to confirm that you are on the same page by asking at the end of the prompt, "Do you understand the objective and the specific guidelines for the task?" Just as you are working to develop "mechanical sympathy" with AI, a sense check helps AI to gain "human sympathy" with you.

### Chain of Thought (CoT)

Large language models excel at processing vast amounts of information quickly, but they struggle with deductive reasoning, often relying on statistical patterns rather than true reasoning.

There's a prompting approach known as "Chain of Thought" (CoT) that can enhance an LLM's performance by breaking down your prompt into a series of logical steps, guiding the model through a structured thinking process.

Explicitly instructing the model to "think step-by-step" often leads to better results. This instruction engages the model in a continuous "chain of thought," promoting a more reasoned approach.

When using AI for outlining and writing, I typically utilize a version of the chain-of-thought framework. However, instead of writing a single prompt, I break the task into a *sequence* of prompts. After each step, I can then focus on refining the output in a structured manner before proceeding to the next step.

## The Path to Mastery

By now, you have already been exposed to 90% of what you need to know to get started on your own journey. But it's that final 10% of principles that will put you ahead of 99% of content creators using AI.

Even before I learned the terminology and frameworks contained in this chapter, I found myself leveraging principles like chain of thought. I would pose an initial high-level prompt to Claude. Then break down the process into smaller steps, refining the AI's work at each stage. This prompted sequence allowed greater control in sculpting the final output.

This "book learning" is worth less than the hands-on experience you will acquire, but I hope it will provide a shortcut to mechanical sympathy — that subconscious competence that must be learned at the end through *doing*.

---

*This post is adapted from "Commanding the Page" (2023).*
