# How I Used AI to Resurrect 80 Years of Lost Agrarian Wisdom

Tags: AI, Homesteading / The Land, Politics
Done?: No
published?: No
AI summary: AI technology has enabled the digitization of a forgotten journal about Catholic farmers from the 1940s, showcasing the gap between AI capabilities and their actual use. Traditional OCR struggles with old documents, but AI vision models can intelligently format and understand context. The author created tools to convert PDFs and podcasts into Markdown, emphasizing the importance of using AI for practical needs rather than commercializing innovations. This approach aligns with the Catholic Land Movement's belief in valuing roots over routes, highlighting the need for wisdom in utilizing technological power.
Archive: No
Created time: October 27, 2025 12:39 PM
Projects: Creative Intelligence Agency (https://www.notion.so/Creative-Intelligence-Agency-66898f0e6c9a49dabf3dd2547fe3cd9b?pvs=21)
Published/Archive/Done: No
Summary: Using AI, the author digitized a forgotten journal from the Catholic Land Movement, overcoming challenges with traditional OCR by developing a system that utilizes AI vision models for better accuracy. This process highlighted the gap between technological capabilities and practical applications, emphasizing the value of using advanced tools to recover and preserve historical wisdom rather than focusing solely on commercial ventures. The author reflects on the importance of roots and wisdom in contrast to the fast-paced tech landscape.
move to lightbulb: No

Sam Altman talks about an "overhang" of businesses waiting to be built. The technology exists; we're just slow to use it. While everyone races to build the next startup, I've been using AI for something smaller and stranger: digitizing a forgotten journal about Catholic farmers from the 1940s.

The gap between what AI can do and what we're actually doing with it is real. Some people worry about mass unemployment. Others see new possibilities. I see something more specific: a lot of important documents that were too marginal to digitize before are suddenly accessible.

"The Cross and the Plow" was a journal of the Catholic Land Movement in England during the Depression and World War II. For 80 years, almost no one has read it. I found two dozen issues and wanted to turn them into an anthology.

The problem was simple but annoying. PDFs are just images. You can't search them or edit them. Traditional OCR doesn't work well on old documents with multiple columns and period typography.

I started by having my VA copy-paste pages into ChatGPT's vision model. She processed 10-12 newsletters, but it was mind-numbing work. So I tried something different.

Using Claude Code, I built a system where Claude Sonnet orchestrates everything: a Python script splits the PDF, feeds chunks to GPT-4's vision model via API, and outputs clean Markdown. What took hours now takes 15-20 minutes, automatically.

This taught me something about AI vision models versus traditional OCR. Old OCR does pattern matching—it looks for shapes that match letters. AI vision models understand context. They infer structure and make intelligent formatting decisions. When I compared my tool to ABBY FineReader and Google Document AI, it wasn't close.

The most striking part was how I built this. I don't know Python. I described what I wanted in plain English, often using voice dictation at 200 words per minute. This is what people call "vibe coding"—programming through natural language.

Markdown turned out to be the perfect intermediary. It's structured enough for machines to parse, but simple enough that humans can write it without thinking. It's becoming a universal translator between intent and execution.

I've built two tools now: "PDF MD" (PDF to Markdown) for documents, and "Podcast MD" for converting podcast feeds into structured Markdown. Both solve real problems. Friends have asked to use them.

But I'm not sure I want to commercialize them. What takes clever engineering today might be a built-in feature tomorrow. The ground keeps shifting.

There's something paradoxical about using cutting-edge AI to recover pre-digital wisdom. While everyone builds unicorns, there's value in using these tools for immediate, concrete needs. Build what you need when you need it. Don't get too attached.

The Catholic Land Movement understood that real security comes from roots, not routes. They advocated for returning to the land from a clear assessment of what makes for human flourishing.

AI has become my path back to their insights. The tech world obsesses over breakthroughs while I use their tools to preserve wisdom from previous generations. The land remains while algorithms fade.

The real overhang isn't between AI capabilities and business applications. It's between our technological power and our wisdom about how to use it. The Catholic Land Movement had thoughts about that gap. Thanks to AI, we can hear them again.

https://claude.ai/share/7347b89c-53ac-42fb-a08d-9a9e4e2b795b