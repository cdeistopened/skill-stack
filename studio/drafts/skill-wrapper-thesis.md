# Skill Wrapper Thesis

Our exploration of Claude's agentic ecosystem—specifically the Agent Skills and Model Context Protocol (MCP)—reveals a significant opportunity to bridge the gap between "power user" capabilities and general consumer accessibility.

Here is a summary of our key learnings and the path forward for your "Skill Wrapper" concept.

## 1. The Technological Landscape (Late 2025)

- **Agent Skills vs. MCP**: We've clarified that Skills are directory-based "playbooks" (using SKILL.md) that allow Claude to dynamically load instructions and scripts only when needed, keeping context windows lean. MCP is the universal hardware/software "plug" that connects these agents to external data like Google Drive or GitHub.

- **Computer Use**: Claude 3.5 Sonnet now natively interacts with UIs (clicking, typing, scrolling). While powerful, it is currently high-latency and high-cost ($30+ for complex tasks), making it a premium feature.

- **Progressive Disclosure**: This is the core design principle. Instead of giving Claude 100% of the information at once, Skills allow Claude to "fetch" only the specific forms.md or scripts/ it needs for the current step.

## 2. The Opportunity: The "Skill Wrapper" App

You identified that the high barrier to entry (Claude Pro, technical setup, file management) prevents most people from using these tools. Your idea is to build apps that wrap these skills, providing a "One-Click Agent" experience.

- **Logic Wrappers (Low Friction)**: You can build a web app that uses the Anthropic API to inject a specialized Skill (like a Homeschool Curriculum builder) as a system prompt. The user gets the expertise without needing to manage files.

- **Action Wrappers (High Value)**: By implementing Remote MCP, your app can act as a bridge, allowing the agent to perform actions (e.g., "Add this schedule to my calendar") through a simplified interface.

## 3. Critical Challenges & Strategies

- **The Cost Trap**: API-driven agents are expensive because of the "chatter" between the model and tools.
  - *Solution*: Use Context Caching for your core Skill files and move toward usage-based pricing rather than flat subscriptions.

- **State Management**: Unlike a single chat, an agent is "stateful." If you wrap a complex Skill, you must manage its "memory" (file system, current task progress) on your own servers.

- **"Sherlocking" Risk**: Anthropic may eventually make Skills shareable within the Claude UI.
  - *Solution*: Your moat must be the User Experience (a custom dashboard vs. a chat window) and Proprietary Data that lives inside your Skill's reference folder.

## 4. Next Steps for Implementation

To turn this into a reality, the most effective path is a "Thin Wrapper" MVP:

1. **Define a Vertical**: Like your homeschool curriculum idea.
2. **Build the SKILL.md**: Perfect the instructions and reference data locally first.
3. **Deploy as a Web App**: Use a stack like Next.js + Anthropic SDK to serve this specific skill to users who pay per "Plan" generated.

---

*TODO: Generate a template for a SKILL.md file specifically for the Homeschool Curriculum idea*
